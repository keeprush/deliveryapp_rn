import 'react-native-gesture-handler';
import React, {useState,useEffect} from 'react';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon, Align} from "./map";
import {Image,PermissionsAndroid, Platform, Text, TouchableOpacity,TextInput, View,ScrollView, StyleSheet} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import AfterLogin from "./Afterlogin"
//다음 주소 검색
import Postcode from 'react-native-daum-postcode';
//AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';
//카카오 로그인
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
// --legacy-peer-deps
// After Login으로 이동

//import KakaoLogin from '@actbase/react-native-kakao-login';
/*

1. async 저장소에 저장이 됨
2. 지도로도 주소 저장 가능하도록 만들기 위해 이벤트 추가할 예정
3. gps를 주소로 변환하는걸 찾으면 현재위치로 설정가능
4. 설정하기 하면 이동

위치 정보 받아오는 창 띄우기
상세 주소 입력하는 창 띄우기
버튼 만들기(주소 설정하기)

카카오 로그인

홈화면 만들기

드론이 날아갈 때 

해야하는 것
위치 정보 받아오는 창 띄우기
상세 주소 입력하는 창 띄우기
geocode, reverse geocode 이걸로 gps -> 주소 변환하기, 주소 -> gps 변환하기
버튼 만들기(설정하기)

카카오 로그인 구현
토큰 Async 저장소에 저장
(토큰이 만료될 수도 있다 DB에 저장? or not?)

로그인 성공 시
gps, 주요 주소, 카카오닉네임 등 post

이 후 주소 변경할 시 주소, gps 저장

홈화면 만들기

# 주문 시 1분마다 gps 받아오기
# 혹은 이동하고 있는거 보여주는것처럼 gps 받아와서 처리하는거!
*/

//npm run android
//react-native start

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
var status=1;
/*
headerTitle: {
    <View style={{ alignItems:"center",flex:1}}>
        <Text style = {{fontSize:17, color:'white'}}>
        위치를
        </Text>
    </View>
},
headerStyle:{
    backgroundColor:'#f4da6c',
}
*/
//npm install react-native-daum-postcode react-native-webview
const App = () => {
    //geocode, reverse geocode 구현할 것
  //  헤더 숨기기
  //  screenOptions={{
  //  headerShown: false
  //}}
    return <NavigationContainer>
        <Stack.Navigator >
            <Stack.Screen name="home" options={{ 
                title:'주소설정', 
                headerStyle: { 
                    backgroundColor: '#121212',
                    },
                    headerTintColor: '#fff',
                      headerTitleStyle: { 
                          fontWeight: 'bold',
                          textAlign: 'center',
                          flex:1
                          },
                      }}
                       component={MapViewScreen}/>
            <Stack.Screen name="주소검색" options={{ 
                title:'주소검색', 
                headerStyle: { 
                    backgroundColor: '#121212',
                    },
                    headerTintColor: '#fff',
                      headerTitleStyle: { 
                          fontWeight: 'bold',
                          textAlign: 'center',
                          flex:1
                          },
                          headerRight:() => (
            <TouchableOpacity
            //안드로이드 가운데 정렬용
              onPress={() => alert('This is a button!')}
            />),
            }}
//#BB86FC : 보라, #121212 검정   
            component={YourView}/>
            <Stack.Screen name="카카오로그인" options={{ 
                title:'카카오로그인', 
                headerStyle: { 
                    backgroundColor: '#121212',
                    },
                    headerTintColor: '#fff',
                      headerTitleStyle: { 
                          fontWeight: 'bold',
                          textAlign: 'center',
                          flex:1
                          },
                          headerRight:() => (
            <TouchableOpacity
            //안드로이드 가운데 정렬용
              onPress={() => alert('This is a button!')}
            />),
            }}
//#BB86FC : 보라, #121212 검정   
            component={KakaoScreen}/>
        <Stack.Screen name="AfterLogin" 
            options = {{headerShown: false}}
//#BB86FC : 보라, #121212 검정   
            component={AfterLogin}/>
        </Stack.Navigator>
    </NavigationContainer>
    
}
//지도
const YourView = () => {
  return<>
    <Postcode
        style={{ width: '100%', height: '100%' }}
        jsOptions={{ animated: false }}
        //setItemToAsync
        onSelected={(data) => setItemToAsync('address',data["roadAddress"])}
    />
    </>
}
const HomeScreen = () => (
    <Tab.Navigator>
        <Tab.Screen name={"map"} component={MapViewScreen}/>
    </Tab.Navigator>
)
 
/*
get method
AsyncStorage.getItem('user_id', (err, result) => {
  console.log(result); // User1 출력
    });
*/
//<Marker coordinate={P4} onClick={() => console.warn('onClick! p4')} image={require("./marker.png")} width={48} height={48}/>
const MapViewScreen = ({navigation}) => {
  const [result, set_result] = useState("");
  const [result_xy, set_result_xy] = useState({"latitude": 37.564362, "longitude": 126.977011});
  const [camera_status, set_camera_status] = useState("0");
  const [titleValid, setTitleValid] = useState(false);
  const [title, set_title] = useState("");
const titleChangeHandler = (text) => {
  if (text.trim().length === 0) {
    setTitleValid(false);
  } else {
    setTitleValid(true);
  }
  set_title(text);
};

  useEffect(() => {
    //임시
    setItemToAsync("nickname","first")
    navigation.navigate("AfterLogin")
    requestLocationPermission();
  }, []);

  // 다시 이 화면으로 전환될 시에 Async 저장소에서 가져와 result 값 갱신 ( 생명주기 )
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          //console.log('navigation');
          AsyncStorage.getItem('address', (err, r) => {
            if(r != null) {
              r = JSON.parse(r);
              set_result(r);
              (async () => {
                const y = await get_geocode(r);
                set_result_xy(y)
                set_camera_status("0")
              })()
            }
        })
        });
        //{"latitude": 127.0209389, "longitude": 37.5942206}
    }, [navigation]);
/*
    const P0 = {latitude: 37.564362, longitude: 126.977011};
    console.log(P0["latitude"]);
    (async () => {
      const x = await get_reverse_geocode(127.0209389, 37.5942206);
      console.log(x);
    })()
*/
//<Marker coordinate={result_xy} onClick={() => console.warn('여기')} caption={{text: "여기", align: Align.top}}/>
    return <>
        <NaverMapView style={{width: '100%', height: '70%'}}
                      showsMyLocationButton={true}
                      center={{...result_xy, zoom: 16}} //result_xy
                      onTouch={e =>{
                        set_camera_status("1")
                      }
                      }
                      onCameraChange={e => 
                      {
                        if(camera_status=="1"){
                        set_result_xy({latitude: e["latitude"], longitude: e["longitude"]})
                        {
                        //console.warn('onCameraChange', JSON.stringify(e))
                        }
                        (async () => {
                          const y = await get_reverse_geocode(e["longitude"], e["latitude"])
                          set_result(y)
                          setItemToAsync('address',y)
                          set_camera_status("0")
                          })()
                        }
                      }
                      }
                      //onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
                      useTextureView>
        </NaverMapView>
        {/* 네이버 마커 */}
        <Image
            style={{position: 'absolute', top:'27%', left:'45%', width:'10%', height:'8%'}}
            source={require('./asset/image/marker.png')}/>

        <TouchableOpacity style={{position: 'absolute', top: '0%', right: 16}} onPress={() => navigation.navigate('주소검색')}>
            <View style={{backgroundColor: 'gray', padding: 10}}>
                <Text style={{color: 'white'}}>주소 검색 하기</Text>
            </View>
        </TouchableOpacity>
        <View style={{width: '100%',flex:1,backgroundColor:'#121212'}}>
          <View style={{alignItems:'center',width:'100%',flexDirection: 'row',flex:1, backgroundColor:'#121212'}}>
            <Text style={styles.middle_title}>기본주소</Text>
            <TextInput editable = {false} style = {styles.TextInput}>{result}</TextInput>
          </View>
          <View style={{alignItems:'center',width:'100%',flexDirection: 'row',flex:1, backgroundColor:'#121212'}}>
            <Text style={styles.middle_title}>상세주소</Text>
            <TextInput style = {styles.TextInput} onChangeText={(text) => titleChangeHandler(text)} >{!titleValid && <Text>여기에 입력해 주세요</Text>}</TextInput>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: '#BB86FC',width:'100%', height:56, justifyContent: "center",alignItems:"center"}} onPress={() => navigation.navigate('카카오로그인')}>
                <Text style={{color: 'white',fontSize:20}}>주소 등록</Text>
        </TouchableOpacity>
    </>
};
//127.0209389
// 지오코드 구하는 함수(주소 -> 좌표)
async function get_geocode(query){
  var x = 0
  var y = 0
  await fetch('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode'
        + '?query='+query,
    {
      method: 'GET',
      headers:
      {
        'X-NCP-APIGW-API-KEY-ID':'m3exduta4s',
        'X-NCP-APIGW-API-KEY':'EeICR8EinWFIDBKW7XyHEHmgxPdcV3qcHx7KEr7i'
      }
    }
    )
    .then((response) => response.json() )
    .then((responseJson) => {
      responseJson = responseJson['addresses']
      x = Number(responseJson[0].x)
      y = Number(responseJson[0].y)
    }
      ).catch((err) => console.log("err"+ err));
    return {latitude: y, longitude: x};
}
// 10초당 한번 업데이트
// 리버스_지오코드 구하는 함수(좌표 -> 주소)
async function get_reverse_geocode(x, y){
  var si = ''
  var gu = ''
  var road = ''
  var num = ''
  var addr = ''
  await fetch("https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc"
  +"?coords="+x+","+y
  +"&output=json"
  +"&orders=roadaddr,legalcode,admcode",
    {

      method: 'GET',
      headers:
      {
        'X-NCP-APIGW-API-KEY-ID':'m3exduta4s',
        'X-NCP-APIGW-API-KEY':'EeICR8EinWFIDBKW7XyHEHmgxPdcV3qcHx7KEr7i'
      }
    }
    )
    .then((response) => response.json())
    .then((responseJson) => {
      response1 = responseJson.results[1] // 시, 구 추출
      response2 = responseJson.results[0] // 도로명주소, 번호 추출
      si = response1.region.area1.name
      gu = response1.region.area2.name
      road = response2.land.name
      num = response2.land.number1
      addr = si + ' ' + gu + ' ' + road + ' ' + num
      }).catch((err) => console.log("err"+ err));
      return addr
}

 //360 56 : w, h justifyContent:'center'
async function requestLocationPermission() {
    if (Platform.OS !== 'android') return;
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'show my location need Location permission',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
        } else {
            console.log('Location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
}
 

const isEmpty = function (value) {
  if (value === '' || value === null || value === undefined || (value !== null && typeof value === 'object' && !Object.keys(value).length)) {
    return true;
  } else {
    return false;
  }
};

// AsyncStorage set 함수 모듈
export const setItemToAsync = (storageName, item) => {
  if (isEmpty(storageName)) {
    throw Error('Storage Name is empty');
  }

  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(storageName, JSON.stringify(item), (error) => {
      if (error) {
        reject(error);
      }
      
      resolve('입력 성공');
      //console.log(storageName,item);
    });
  });
};
const KakaoScreen = ({navigation}) => {
    const [r, setR] = useState('');
// 카카오 함수들
const signInWithKakao = async (): Promise<void> => {
  const token: KakaoOAuthToken = await login();
  setR(JSON.stringify(token));
  console.log(token);
  navigation.navigate("AfterLogin")
};
const signOutWithKakao = async (): Promise<void> => {
  const message = await logout();
  setR(message);
};
const getProfile = async (): Promise<void> => {
  const profile: KakaoProfile = await getKakaoProfile();
  setR(JSON.stringify(profile));
};
const unlinkKakao = async (): Promise<void> => {
  const message = await unlink();
  setR(message);
};
  return <>
  <ScrollView>
  <Text>{r}</Text>
          <View style={{height: 400}} />
  </ScrollView>
  <View>
      <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: '#BB86FC',width:'100%', height:56, justifyContent: "center",alignItems:"center"}} onPress={() => signInWithKakao()}>
                  <Text style={{color: 'white',fontSize:20}}>카카오로그인</Text>
      </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: '#BB86FC',width:'100%', height:56, justifyContent: "center",alignItems:"center"}} onPress={() => getProfile()}>
                  <Text style={{color: 'white',fontSize:20}}>프로필조회</Text>
          </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: '#BB86FC',width:'100%', height:56, justifyContent: "center",alignItems:"center"}} onPress={() => unlinkKakao()}>
                  <Text style={{color: 'white',fontSize:20}}>링크해제</Text>
          </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: '#BB86FC',width:'100%', height:56, justifyContent: "center",alignItems:"center"}} onPress={() => signOutWithKakao()}>
                  <Text style={{color: 'white',fontSize:20}}>카카오 로그아웃</Text>
          </TouchableOpacity>
    </View>
  </>
};

//스타일
const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  middle_title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft:8,
    paddingRight:8,
    textAlign:'center',
  },
  activeTitle: {
    color: 'red',
  },
  TextInput:{
    borderWidth:2,
    backgroundColor:'white',
    borderColor:'#BB86FC',
    borderRadius:8,
    paddingRight:8,
    height:40,
    width:300,
  }
});

export default App;