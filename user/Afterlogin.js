import 'react-native-gesture-handler';
import React, {useState,useEffect} from 'react';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon, Align} from "./map";
import {SectionList,FlatList, SafeAreaView,  Image,PermissionsAndroid, Platform, Text, TouchableOpacity,TextInput, View,ScrollView, StyleSheet, TouchableOpacityBase} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
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
//현재 위치 가져오기
import Geolocation from 'react-native-geolocation-service';

//탭바
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
//벡터아이콘
import Icon from 'react-native-vector-icons/FontAwesome';
import { and } from 'react-native-reanimated';
// 토스트
import Toast from 'react-native-toast-message';
import { info } from 'node:console';

const Tab = createMaterialTopTabNavigator();
const bottom_tab = createBottomTabNavigator();
//npm run android
//react-native start
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
{/*여기*/}
const AfterLogin = ({navigation}) => {
  const [steamed, set_steamed] = useState("")
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //console.log('navigation');
      const result = setInterval(()=>{
      Geolocation.getCurrentPosition(
        (position) => {
            //set_user_xy({"latitude": position.coords.latitude, "longitude": position.coords.longitude})
            console.log('타이머 작동!')
            setItemToAsync("user_xy",{"latitude": position.coords.latitude, "longitude": position.coords.longitude})
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  },2000);
    return() => clearInterval(result);

    });
    //{"latitude": 127.0209389, "longitude": 37.5942206}
}, [navigation]);

    return <>
      <Stack.Navigator>
      <Stack.Screen name="bottom_tab" options={{ 
                title:'bottom_tab',
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
            component={bottom}/>
    <Stack.Screen name="HomeScreen" options={{ 
                title:'HomeScreen', 
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
            <TouchableOpacityBase
              onPress={() => alert('This is a button!')}
            />),
            }}
            component={HomeScreen}/>
 <Stack.Screen name="Steamed" options={{ 
                title:'Steamed', 
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
            <TouchableOpacityBase
              onPress={() => alert('This is a button!')}
            />),
            }}
            component={Steamed}/>
 <Stack.Screen name="orderlist" options={{ 
                title:'orderlist', 
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
            <TouchableOpacityBase
              onPress={() => alert('This is a button!')}
            />),
            }}
            component={orderlist}/>
    <Stack.Screen name="confirm" options={{ 
                title:'주문내역',
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
                onPress={() => alert('This is a button!')}
                />),
            }}  
            component={confirm}/>
            
      <Stack.Screen name="review" options={{ 
                title:'리뷰쓰기',
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
                onPress={() => alert('This is a button!')}
                />),
            }}  
            component={review}/>
 <Stack.Screen name="My" options={{ 
                title:'My', 
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
            <TouchableOpacityBase
              onPress={() => alert('This is a button!')}
            />),
            }}
            component={My}/>
    <Stack.Screen name="category" options={{ 
                title:'category',
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
            component={category}/>
    <Stack.Screen name="all" options={{ 
                title:'전체보기',
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
            component={all}/>
      <Stack.Screen name="top_tab" options={{ 
                title:'router',
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
            component={top_tab}/>

<Stack.Screen name="selected" options={{ 
                title:'선택된 화면',
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

                <View style={{right:16}}>
                <TouchableOpacity //찜
                
                onPress={() =>
                  AsyncStorage.getItem('nickname', (err, result1) => {
                    AsyncStorage.getItem('store_name', (err, result2) => {
                      result1 = result1.replace('"',"")
                      result1 = result1.replace('"',"")
                      result2 = result2.replace('"',"")
                      result2 = result2.replace('"',"")
                      console.log(result1);
                      console.log(result2);
                      fetch("http://192.168.219.141:8000/users/"+result1+'/', {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json'
                        }
                        })
                        .then((response) => {
                          return response.json()
                        })
                        .then(data=> {
                          let temp = []
                          if(data.steamed==null){
                            temp.push(result2)
                          }
                          else{
                          temp = data.steamed;
                          temp=temp.split(',') // string to 배열
                          temp.push(result2)
                          }
                          temp = temp.toString();  // 배열 to string
                          console.log(temp)
                          fetch("http://192.168.219.141:8000/users/"+result1+'/', {
                                  method: "PATCH",
                                  headers: {
                                  "Content-Type": "application/json"
                                  },
                                  body: JSON.stringify({
                                    steamed:temp,
                                  }),
                                }).then((response) => {
                                  console.log(response)
                              })
                                .catch(error => console.log(error))

                        })
                        .catch(error => console.log(error))
                  })
                  })
                }
                >
                  <View>
                  <Icon name="heart" color={'white'} size={16} />
                  </View>
                  </TouchableOpacity>
                  </View>),
            }}
//#BB86FC : 보라, #121212 검정
            component={selected}/>

      <Stack.Screen name="selected_cart" options={{ 
                title:'장바구니',
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
            component={selected_cart}/>
<Stack.Screen name="selected_order_finished" options={{ 
                title:'주문완료창',
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
            component={selected_order_finished}/>
        </Stack.Navigator>
        <Toast ref={(ref) => Toast.setRef(ref)} />
        </>

    
}
const HomeScreen = ({navigation}) => {
    return <>
    <View style={{flex:1,backgroundColor:'#121212'}}>
          <Image
            style={{height:150,width:395, alignItems: 'center'}}
            source={require('./asset/drawable-xhdpi/26.png')}/>
        
        <View style={styles.including_style}>
        <TouchableOpacity style={styles.element} onPress={() => navigation.navigate('top_tab')}>
                    <Image
                    style={{height:57,width:57,top:2, borderRadius:25}}
                    source={require('./asset/image/전체보기.jpg')}/>
                    <Text style={styles.element_text} >전체보기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.element} onPress={() => navigation.navigate('top_tab')}>
                    <Image
                    style={{height:57,width:57,top:2, borderRadius:25}}
                    source={require('./asset/image/한식.jpg')}/>
                    <Text style={styles.element_text} >한식/중식/일식</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.element} onPress={() => navigation.navigate('category')}>
                    <Image
                    style={{height:57,width:57,top:2, borderRadius:25}}
                    source={require('./asset/image/분식.jpg')}/>
                    <Text style={styles.element_text} >분식/치킨/피자</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.element} onPress={() => navigation.navigate('category')}>
                    <Image
                    style={{height:57,width:57,top:2, borderRadius:25}}
                    source={require('./asset/image/아시안.jpg')}/>
                    <Text style={styles.element_text} >아시안/양식</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.including_style}>
        <TouchableOpacity style={styles.element} onPress={() => navigation.navigate('category')}>
                    <Image
                    style={{height:57,width:57,top:2, borderRadius:25}}
                    source={require('./asset/image/족발.jpg')}/>
                    <Text style={styles.element_text} >족발/보쌈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.element} onPress={() => navigation.navigate('category')}>
                    <Image
                    style={{height:57,width:57,top:2, borderRadius:25}}
                    source={require('./asset/image/카페.jpg')}/>
                    <Text style={styles.element_text} >카페/디저트</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.element} onPress={() => navigation.navigate('category')}>
                    <Image
                    style={{height:57,width:57,top:2, borderRadius:25}}
                    source={require('./asset/image/야식.jpg')}/>
                    <Text style={styles.element_text} >야식</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.element} onPress={() => navigation.navigate('category')}>
                    <Image
                    style={{height:57,width:57,top:2, borderRadius:25}}
                    source={require('./asset/image/프랜차이즈.jpg')}/>
                    <Text style={styles.element_text} >프랜차이즈</Text>
        </TouchableOpacity>
        </View>
    </View>
    
          
    </>
};

const category = () => {
  return<>
    <Postcode
        style={{ width: '100%', height: '100%' }}
        jsOptions={{ animated: false }}
    />
    </>
}
const bottom = () => {
  return(
    <bottom_tab.Navigator
    initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#BB86FC',
        inactiveTintColor: '#D3D3D3',
        labelPosition: 'below-icon',
        adaptive:true,
        style: {
          backgroundColor: '#121212',
        },
        labelStyle: {
          textAlign: 'center',
          fontSize:12,
        },
      }}
    >
      <bottom_tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />)}}/>
      <bottom_tab.Screen name="Steamed" component={Steamed} options={{
          tabBarLabel: '찜',
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />)}}/>

      <bottom_tab.Screen name="orderlist" component={orderlist} options={{
          tabBarLabel: '주문내역',
          tabBarIcon: ({ color, size }) => (
            <Icon name="file" color={color} size={size} />)}}/>

      <bottom_tab.Screen name="My" component={My} options={{
          tabBarLabel: 'My',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />)}}/>
    </bottom_tab.Navigator>
  );
}
const Steamed = ({navigation}) => {
  const [store, set_store] = useState("");
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus',
    () => AsyncStorage.getItem('nickname', (err, result1) => {
        result1 = result1.replace('"',"")
        result1 = result1.replace('"',"")
        fetch("http://192.168.219.141:8000/users/"+result1+'/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
          })
          .then((response) => {
            return response.json()
          })
          .then(data=> {
            let temp = data.steamed  // 찜한 가게들 가져오기
            let temp_store=[]        // 가게들 저장
            temp=temp.split(',') // string to 배열
            for(i in temp){
                      fetch("http://192.168.219.141:8000/storekeepers/"+temp[i]+'/', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                  })
                  .then((response) => {
                    return response.json()
                  })
                  .then(data=> {
                    temp_store.push(data)
                    set_store(temp_store)
                  })
                  .catch(error => console.log(error))
            }
          })
          .catch(error => console.log(error))
    })
    );
}, [navigation]);

  return<>
    <View style={styles.flat_container}>
    <FlatList
      data= {store}
      renderItem={({item}) => 
      <TouchableOpacity style={styles.category_flat} onPress={() =>{
        setItemToAsync('store_name',item.store_name)
        navigation.navigate('selected')
        }}>
      <Image
      style={{height:80,width:80,top:4,left:8, borderRadius:50}}
      source={{uri: item.store_img}}/>
      <View style = {{flex:1}}>
      <Text style={{left:16, top:4,fontSize:20,color:'white'}} >{item.store_name}</Text>
      <View style = {{flexDirection:'row'}}>
      <Image style={{top:8, left:16, height:12,width:12, borderRadius:25}}
                    source={require('./asset/image/star.png')}/>
      <Text style={{top:6, left:16, fontSize:12,color:'white'}} >0.0 리뷰 수 : 0</Text>
      </View>
      <Text style={{left:16, top:16,fontSize:12,color:'white'}} >배달팁: {item.delivery_fee}원</Text>
      
      </View>
      </TouchableOpacity>

      //<Text style={styles.items}>{item.store_name}</Text>
    }
      keyExtractor={(item, index) => index}

    />
  </View>
  </>
}
const review = ({navigation}) => {
  const [nickname, set_order] = useState("");
  const [store_notice, set_store_notice] = useState("");
  const [star, set_star] = useState("");


  return<>
  <View style = {{height:'90%',flex:1, backgroundColor:'#121212'}}>
  <View style={{}}>
            <Text style={{left:16, marginTop:8,fontSize:20,color:'#BB86FC'}}>별점 수</Text>
            <TextInput maxLength = {1} placeholder="5"style = {styles.TextInput2} onChangeText={(text) => set_star(text)} ></TextInput>
  </View>

  <View style={{}}>
            <Text style={{left:16, marginTop:8,fontSize:20,color:'#BB86FC'}}>리뷰내용</Text>
            <TextInput textAlign ='left' textAlignVertical='top' placeholder = '공백 포함 500자 이내로 입력하세요'
             multiline = {true} maxLength = {500} style = {styles.TextInput_col} onChangeText={(text) => set_store_notice(text)} ></TextInput>
  </View>

    </View>
    <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: '#BB86FC',width:'100%', height:'10%', justifyContent: "center",alignItems:"center"}} onPress={() => {
      AsyncStorage.getItem('nickname', (err, result1) => {
      AsyncStorage.getItem('store_name', (err, result2) => {
        result1= result1.replace('"','')
        result1= result1.replace('"','')
        result2= result2.replace('"','')
        result2= result2.replace('"','')
        console.log(result1,result2,store_notice,star);
        fetch("http://192.168.219.141:8000/reviews/", {
          method: "POST",
          headers: {
          "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nickname:result1,
            store_name:result2,
            comment:store_notice,
            star:star,
          }),
        }).then((response) => {
          console.log(response)
      })
        .catch(error => console.log(error))

      });
      });
      navigation.navigate('bottom_tab')
  }}>
                <Text style={{color: 'white',fontSize:20}}>작성</Text>
        </TouchableOpacity>
    </>

}
const confirm = ({navigation}) => {
  const [order, set_order] = useState("");
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus',
    () => {
    AsyncStorage.getItem('id', (err, result) => {
      let r = result
      r = r.replace('"','')
      r = r.replace('"','')
      fetch("http://192.168.219.141:8000/orderinfos/"+r+'/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
        })
        .then((response) => {
          return response.json()
        })
        .then(data=> {
          let temp = data.selected_food;
          for(var i in temp){
            temp = temp.replace("'",'"')
         }
         temp=JSON.parse(temp);
         console.log(temp);
          data.selected_food = temp
          console.log(data);
          set_order(data);
        })
        .catch(error => console.log(error))
    });
    });
}, [navigation]);
  return<>
  <View style = {{height:'90%',flex:1, backgroundColor:'#121212'}}>
      <View style = {{backgroundColor:'#121212'}}>
      <Text style={{left:16, marginTop:8,fontSize:20,color:'#BB86FC'}} >가게이름</Text>
      <Text style={{left:16, marginTop:4,fontSize:16,color:'white'}} >{order.store_name}</Text>
      <Text style={{left:16, marginTop:8,fontSize:20,color:'#BB86FC'}} >주문번호</Text>
      <Text style={{left:16, marginTop:4,fontSize:16,color:'white'}} >{order.id}</Text>
      <Text style={{left:16, marginTop:8,fontSize:20,color:'#BB86FC'}} >주문내역</Text>
      </View>
      <View style = {{backgroundColor:'#121212'}}>
      <FlatList
      data= {order.selected_food}
      style = {{height:150}}
      renderItem={({item}) =>
        <View style={{flexDirection:'row',justifyContent:"space-between"}}>
          <Text style={{left:16, marginTop:4,fontSize:16,color:'white'}}>{item.name}</Text>
          <Text style={{marginTop:4,fontSize:16,color:'white'}}>{item.count}</Text>
          <Text style={{right:16,marginTop:4,fontSize:16,color:'white'}}>{item.price}</Text>
          </View>
      }
      keyExtractor={(item, index) => index}
    />
    </View>
    <View style = {{backgroundColor:'#121212'}}>
      <Text style={{left:16, marginTop:8,fontSize:20,color:'#BB86FC'}} >합계금액(결제금액)</Text>
      <Text style={{left:16, marginTop:4,fontSize:16,color:'white'}} >{order.price_all}</Text>
      <Text style={{left:16, marginTop:8,fontSize:20,color:'#BB86FC'}} >주문상태</Text>
      <Text style={{left:16, marginTop:4,fontSize:16,color:'white'}} >{order.order_now}</Text>
      <Text style={{left:16, marginTop:8,fontSize:20,color:'#BB86FC'}} >주문시간</Text>
      <Text style={{left:16, marginTop:4,fontSize:16,color:'white'}} >{order.order_time}</Text>
    </View>
    </View>
    <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: '#BB86FC',width:'100%', height:'10%', justifyContent: "center",alignItems:"center"}} onPress={() => navigation.navigate('bottom_tab')}>
                <Text style={{color: 'white',fontSize:20}}>돌아가기</Text>
        </TouchableOpacity>
    </>
}
const orderlist = ({navigation}) => {
  const [store, set_store] = useState();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus',
    () => {
    AsyncStorage.getItem('nickname', (err, result) => {
      let r = result
      r = r.replace('"','')
      r = r.replace('"','')
      fetch("http://192.168.219.141:8000/orderinfos/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
        }).then((response) => {
          return response.json()
        })
        .then(data=> {
          let temp = data.results;
          let temp_array = [];
          let temp_store_array = [];
          //주문번호, 주문 상태
          for(let i in temp){
            if(r==temp[i].user){
              fetch("http://192.168.219.141:8000/storekeepers/"+temp[i].store_name+"/", {
              method: 'GET',
              headers: {
              'Content-Type': 'application/json'
            }
            }).then((response) => {
              return response.json()
            })
            .then(data=> {
              data['id']=temp[i].id;
              data['order_now']=temp[i].order_now;
              temp_store_array.push(data);
              if(i==temp.length-1){ // 마지막에 데이터 저장
                set_store(temp_store_array);
              }
            })
            .catch(error => console.log(error))
            }
         }
          })
          .catch(error => console.log(error))
    });
    });
}, [navigation]);
  return<>
    <View style={styles.flat_container}>
    <FlatList
      data= {store}
      renderItem={({item}) => 
      <TouchableOpacity style={styles.category_flat} onPress={() =>{
        setItemToAsync('store_name',item.store_name)
        navigation.navigate('selected')
        }}>
      <Image
      style={{height:80,width:80,marginTop:4,left:8, borderRadius:50}}
      source={{uri: item.store_img}}/>
      <View style = {{flexDirection:'row',flex:1,justifyContent:'space-between'}}>
      <View>
      <Text style={{left:16, marginTop:4,fontSize:20,color:'white'}} >{item.store_name}</Text>
      <View style = {{flexDirection:'row'}}>
      <Image style={{marginTop:4, left:16, height:12,width:12, borderRadius:25}}
                    source={require('./asset/image/star.png')}/>
      <Text style={{marginTop:2, left:16, fontSize:12,color:'white'}} >{item.star} 리뷰 수 : {item.review_count}</Text>
      </View>
      <Text style={{left:16, marginTop:2,fontSize:12,color:'white'}} >배달팁: {item.delivery_fee}원</Text>
      <Text style={{left:16, marginTop:2,fontSize:12,color:'white'}} >주문번호: {item.id} 주문상태: {item.order_now}</Text>
      </View>
      <View style={{}}>
      <TouchableOpacity style={{top:0,width:100, height:25, borderWidth:1, borderRadius:25,borderColor:'white',backgroundColor:'#BB86FC',justifyContent:'center',right:16}} onPress={() =>{
        setItemToAsync('id',item.id)
        navigation.navigate("confirm")
        }}>
          <Text style={{fontSize:12,color:'white',textAlign:'center'}}>주문확인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{top:4,width:100, height:25, borderWidth:1, borderRadius:25,borderColor:'white',backgroundColor:'#BB86FC',justifyContent:'center',right:16}} onPress={() =>{
        setItemToAsync('id',item.id)
        navigation.navigate('review')
        }}>
          <Text style={{fontSize:12,color:'white',textAlign:'center'}}>리뷰쓰기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{top:8,width:100, height:25, borderWidth:1, borderRadius:25,borderColor:'white',backgroundColor:'#BB86FC',justifyContent:'center',right:16}} onPress={() =>{
        setItemToAsync('id',item.id)
        setItemToAsync('store_name',item.store_name)
        navigation.navigate('selected_order_finished')
        }}>
          <Text style={{fontSize:12,color:'white',textAlign:'center'}}>배달현황</Text>
      </TouchableOpacity>
      </View>
      </View>
      </TouchableOpacity>

      //<Text style={styles.items}>{item.store_name}</Text>
    }
      keyExtractor={(item, index) => index}

    />
  </View>
    </>
}
const My = () => {
  return<>
    
    <Text>hi!</Text>
    </>
}
const selected = ({navigation}) => {
  const [store, set_store] = useState("");
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus',
    () => {
    AsyncStorage.getItem('store_name', (err, result) => {
      let r = result
      r = r.replace('"','')
      r = r.replace('"','')
      fetch("http://192.168.219.141:8000/storekeepers/"+r+"/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
        }).then((response) => {return response.json() })
        .then(data=> set_store(data))
        .catch(error => console.log(error))
    });
    });
}, [navigation]);
  return<>
  {/*<Text style={{fontSize:25,color:'white'}}>찜 수: {store.order_count}</Text> {/* 리뷰 */}
  <View style={{flex:1}}>
  <View style={{height:'20%',backgroundColor:'#121212',}}>
  <Text style={{ top:16,textAlign:'center',fontSize:25,color:'#BB86FC'}}>{store.store_name}</Text>
  <Text style={{top:16,fontSize:10,color:'white',textAlign:'center'}}>총주문 수: {store.order_count} 찜 수: {store.Steamed_count} 리뷰 수:{store.review_count}</Text>
  <View style = {{top:16, height:1,width:'100%',backgroundColor:'#BB86FC'}}></View>
  {/*최소 주문 금액, 배달 팁, 배달 시간*/}
  <Text style={{left:16, top:20,fontSize:12,color:'white'}}>최소 주문 금액: 0원</Text>
  <Text style={{left:16, top:20,fontSize:12,color:'white'}}>배달 팁: {store.delivery_fee}원</Text>
  <Text style={{left:16, top:20,fontSize:12,color:'white'}}>배달 시간: 16~20분</Text>
  </View>
    <Tab.Navigator
    initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#121212',
        },
        labelStyle: {
          textAlign: 'center',
          fontSize:12,
        },
        indicatorStyle: {
          borderBottomColor: '#BB86FC',
          borderBottomWidth: 2,
        },
      }}
    >
      <Tab.Screen name="메뉴" component={selected_menu} />
      <Tab.Screen name="정보" component={selected_info} />
      <Tab.Screen name="리뷰" component={selected_review} />
    </Tab.Navigator>
    </View>
  </>
}
const selected_menu = ({navigation}) => {
  const [store, set_store] = useState("");
  const [store_name,set_store_name] = useState("");
  const [selected_food, set_select_food] = useState([]);
  const [food, set_food] = useState("");
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus',
    () => {
    AsyncStorage.getItem('store_name', (err, result) => {
      let r = result
      r = r.replace('"','')
      r = r.replace('"','')
      fetch("http://192.168.219.141:8000/storekeepers/"+r+"/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
        }).then((response) => {return response.json() })
        .then(data=> {
          set_store(data);
          //
          let d = data.recommend.toString();
          let food_temp1 = [];
          d = d.split(',');
          for(let k in d) { 
            let temp = d[k];
            temp = temp.split('_');
             console.log(temp[0]+" : "+temp[1]);
             let t = {
               name:temp[0],
               price:temp[1]
             }
             food_temp1.push(t);  
          }

            let d2 = data.main.toString();
            let food_temp2 = [];
            d2 = d2.split(',');
            console.log(d2)
            for(let k in d2) { 
              let temp = d2[k];
              temp = temp.split('_');
               let t = {
                 name:temp[0],
                 price:temp[1]
               }
               food_temp2.push(t);
              }
          d = data.side.toString();
          let food_temp3 = [];
          d = d.split(',');
          for(let k in d) { 
            let temp = d[k];
            temp = temp.split('_');
             let t = {
               name:temp[0],
               price:temp[1]
             }
             food_temp3.push(t);
            }
          section_list=[
            {title:'추천',data:food_temp1},
            {title:'메인',data:food_temp2},
            {title:'사이드',data:food_temp3},
          ]
          set_food(section_list);
            //
        })
        .catch(error => console.log(error))
    });
    });
}, [navigation]);
  return(
    <View style={styles.flat_container}>
    <SectionList
        sections={food}
        renderSectionHeader={ ({section})=>{
            return <>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                </View>
                <View style = {{height:1,width:'100%',backgroundColor:'#BB86FC'}}></View>
            </>
        }}
        renderItem={ ({item,index,section})=>{
                return(
                    <TouchableOpacity style={styles.menuStyle} onPress={()=>{
                      item.count=1;
                      item.price = parseInt(item.price,10);
                      AsyncStorage.getItem('selected_food', (err, result) => {
                        let r = [];
                        let tf = false;
                        result = JSON.parse(result);
                        for(i in result){
                         if(result[i].name == item.name){
                           tf = true;
                           result[i].count+=1;
                           result[i].price+=item.price; //10진수로 변환 후 값 계산
                         }
                          r.push(result[i])
                        }
                        if(tf==false){
                          r.push(item)
                        }
                        setItemToAsync('selected_food',r)
                      });


                      }} >
                        <Text style={styles.menuText}>{item.name}</Text>
                        <Text style={styles.menuText}>{item.price+'원'}</Text>
                    </TouchableOpacity>
                );
        }}
    keyExtractor={(item,index)=> index}
    >
    
    </SectionList>
    <TouchableOpacity style={{position: 'absolute', top: '80%', right: 16}} onPress={() => navigation.navigate('selected_cart')}>
        <View style={{backgroundColor: 'gray', padding: 10}}>
       <Text style={{color: 'white', fontSize:16}}>+</Text>
       </View>
      </TouchableOpacity>
      {/* 임시 테스트용 */}
      <TouchableOpacity style={{position: 'absolute', top: '80%', left: 16}} onPress={() => setItemToAsync("selected_food",null)}>
        <View style={{backgroundColor: 'gray', padding: 10}}>
       <Text style={{color: 'white', fontSize:16}}>초기화</Text>
       </View>
      </TouchableOpacity>

  </View>
  );
}
const selected_cart = ({navigation}) => {
  const [selected_food, set_select_food] = useState("");
  const [order_price, set_order_price] = useState("");
  const [store, set_store] = useState("");
  const [price_all, set_price_all] = useState("");
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus',
    () => {
    AsyncStorage.getItem('selected_food', (err, result) => {
      console.log(result);
      set_select_food(JSON.parse(result));
      let temp = JSON.parse(result);
      let temp_price= 0
      for(i in temp){
        temp_price+=temp[i].price;
      }
      set_order_price(temp_price);
      AsyncStorage.getItem('store_name', (err, result) => {
        let r = result
        r = r.replace('"','')
        r = r.replace('"','')
        fetch("http://192.168.219.141:8000/storekeepers/"+r+"/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
          }).then((response) => {return response.json() })
          .then(data=> {
            set_store(data)
            let temp_pr = 0
            temp_pr=data.delivery_fee+temp_price;
            setItemToAsync('price_all',temp_pr);
            set_price_all(temp_pr);
          })
          .catch(error => console.log(error))
      });

    });
    });
}, [navigation]);



  return(
    <View style ={{flex:1}}>
    <View style={styles.cart_flat_container}>
    <FlatList
      data= {selected_food}
      renderItem={({item}) => 
      <View style={styles.cart_flat}>
          {console.log(item)}
      <View style = {{flex:1, flexDirection:'row',justifyContent: 'space-between',}}>
        <View style = {{flexDirection:'column'}}>
        <Text style={{left:16, fontSize:12,color:'white'}} >{item.name}</Text>
        <Text style={{left:16, fontSize:12,color:'white'}} >{item.price}원</Text>
      </View>
      <Text style={{right:16, fontSize:12,color:'white'}} >수량: {item.count}</Text>
      </View>
      </View>
      }
      //<Text style={styles.items}>{item.store_name}</Text>
    keyExtractor={(item, index) => index}
    />
  </View>
  <View style={{flex:1,height:'10%',backgroundColor:'#121212'}}>
  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
  <Text style = {{left:16, fontSize:12, color:'#BB86FC'}}>주문금액</Text>
  <Text style = {{right:16, fontSize:12, color:'#BB86FC'}}>{order_price}원</Text>
  </View>
  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
  <Text style = {{left:16, fontSize:12, color:'#BB86FC'}}>배달팁</Text>
  <Text style = {{right:16, fontSize:12, color:'#BB86FC'}}>{store.delivery_fee}원</Text>
  </View>
  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
  <Text style = {{left:16, fontSize:16, color:'#BB86FC'}}>결제금액(배달팁 + 주문금액)</Text>
  <Text style = {{right:16, fontSize:16, color:'#BB86FC'}}>{price_all}원</Text>
  </View>
      </View>
  <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: '#BB86FC',width:'100%', height:'10%', justifyContent: "center",alignItems:"center"}} onPress={() => 
    {
      AsyncStorage.getItem('nickname', (err, result) => {
        console.log(result + store.store_name);
        let r = result
        r = r.replace('"','')
        r = r.replace('"','')
        let sf = JSON.stringify(selected_food)
        for(var i in sf){
           sf = sf.replace('"',"'")
        }
        fetch("http://192.168.219.141:8000/orderinfos/", {
          method: "POST",
          headers: {
          "Content-Type": "application/json"
          },
          body: JSON.stringify({
            store_name: store.store_name,
            user: r,
            selected_food: sf,
            order_price: order_price,
            delivery_fee: store.delivery_fee,
            price_all: price_all,
            order_now: "주문완료",
          }),
        }).then((response) => {
          console.log(response)
      })
        .catch(error => console.log(error))
      });
      navigation.navigate('selected_order_finished')

    }
    }>
                <Text style={{color: 'white',fontSize:20}}>배달 주문하기</Text>
        </TouchableOpacity>
  </View>
  );
}
{/*배달 현황 */}
{/*여기*/}
function get_distance(x1,y1,x2,y2){
  let distance;
  let radius = 6371; // 지구 반지름(km)
  let toRadian = Math.PI / 180;
  let deltaLatitude = Math.abs(x1 - x2) * toRadian;
  let deltaLongitude = Math.abs(y1 - y2) * toRadian;

  let sinDeltaLat = Math.sin(deltaLatitude / 2);
  let sinDeltaLng = Math.sin(deltaLongitude / 2);
  let squareRoot = 
  Math.sqrt(sinDeltaLat * sinDeltaLat +Math.cos(x1 * toRadian) * Math.cos(x2 * toRadian) * sinDeltaLng * sinDeltaLng);
    distance = 2 * radius * Math.asin(squareRoot);
  console.log(distance)
  return distance*1000;
}

const selected_order_finished = ({navigation}) => {
  const [user_xy, set_user_xy] = useState({"latitude": 37.5054447465, "longitude": 126.983844653});  //유저 좌표 
  const [rider_xy,set_rider_xy] = useState({"latitude": 37.5054447465, "longitude": 126.984094653}); //라이더 좌표 
  const [store_xy,set_store_xy] = useState({"latitude": 37.5054447465, "longitude": 126.984094653}); //가게 좌표 50m 떨어짐
  //드론의 속도 12km/h
  //
  //0.000000001 당 약 0.0002m
  //0.000005 당  1m
  //0.000025 당 5m
  //0.00005 당 10m
  //0.00025 당 50m
  //0.0005 당 100m
  //6km 한시간
  //3km 30분
  //1km 10분
  //100m 당 1분
  //10m 당 6초
  //5m 당 3초
  useEffect(() => {
    
    const unsubscribe = navigation.addListener('focus', () => {
      const interval = setInterval(()=>{
          AsyncStorage.getItem('user_xy', (err, result) => {
            let r = result
            //r = r.replace('"','')
            //r = r.replace('"','')
            r = JSON.parse(r);
            console.log('타이머작동2')
            //console.log(r)
            set_user_xy(r);
            AsyncStorage.getItem('rider_xy', (err, result) => {
                let rider = {}
                result = JSON.parse(result)
                let distance=get_distance(result.latitude, result.longitude, r.latitude,r.longitude)
                rider['latitude'] = result.latitude
                rider['longitude'] = result.longitude - 0.00005 // 3초당 10m 씩 이동
                console.log(result)
                console.log(rider)
                setItemToAsync('rider_xy',rider);
                set_rider_xy(rider)
                if(rider.longitude<=r.longitude+0.000005){  // 1m 거리
                  console.log("it's time to !");
                  Toast.show({
                    text1: '배달완료',
                    text2: '배달된 음식을 못받으셨다면 고객센터로 문의 바랍니다.',
                    type:'info',
                    autoHide:false
                  });
                  clearInterval(interval);
                  navigation.navigate('bottom_tab');
                }
            });
          });

    },3000);
    AsyncStorage.getItem('user_xy', (err, result) => {
      let r = result
      //r = r.replace('"','')
      //r = r.replace('"','')
      r = JSON.parse(r);
      console.log('타이머작동2')
      set_user_xy(r);
      setItemToAsync('rider_xy',rider_xy);
      let distance=get_distance(rider_xy.latitude, rider_xy.longitude, r.latitude,r.longitude)
      //console.log('타이머작동'+r);
    });
      return() => clearInterval(interval);
    });
    //{"latitude": 127.0209389, "longitude": 37.5942206}
}, [navigation]);

  return<>
  <NaverMapView style={{width: '100%', height: '90%'}}
    showsMyLocationButton={true}
    center={{...user_xy, zoom: 16}}
    onCameraChange={e => 
    {
      console.log('hi')
    }
    }
    onMapClick={e=>{console.log('Click!')
      }
    }
    useTextureView>
    <Marker coordinate={user_xy} pinColor="blue"/>
    <Marker coordinate={rider_xy} pinColor="red"/>
    <Marker coordinate={store_xy} pinColor="green"/>
   </NaverMapView>
        <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: '#BB86FC',width:'100%', height:'10%', justifyContent: "center",alignItems:"center"}} onPress={() => navigation.navigate('bottom_tab')}>
                <Text style={{color: 'white',fontSize:20}}>돌아가기</Text>
        </TouchableOpacity>
  </>
}
const selected_info = ({navigation}) => {
  const [store, set_store] = useState("");
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus',
    () => {
    AsyncStorage.getItem('store_name', (err, result) => {
      let r = result
      r = r.replace('"','')
      r = r.replace('"','')
      fetch("http://192.168.219.141:8000/storekeepers/"+r+"/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
        }).then((response) => {return response.json() })
        .then(data=> set_store(data))
        .catch(error => console.log(error))
    });
    });
}, [navigation]);

  return(
      <View style={{flex:1, backgroundColor:"#121212"}}>
      <Text style ={styles.info_title_text}>사장님 안내사항</Text>
      <Text style ={styles.info_content_text}>{store.store_notice}</Text>

      <Text style ={styles.info_title_text}>가게 통계</Text>
      <Text style ={styles.info_content_text}>총 주문 수: {store.order_count}</Text>
      <Text style ={styles.info_content_text}>전체 리뷰 수: {store.review_count}</Text>
      <Text style ={styles.info_content_text}>찜 수: {store.Steamed_count}</Text>

      <Text style ={styles.info_title_text}>음식점 정보</Text>
      <Text style ={styles.info_content_text}>운영시간: {store.operation_time}</Text>
      <Text style ={styles.info_content_text}>휴무일: {store.no_operation_time}</Text>
      <Text style ={styles.info_content_text}>전화번호: {store.phone_number}</Text>
      <Text style ={styles.info_content_text}>배달가능지역: {store.possible_delivery}</Text>
      </View>
  );
}
const selected_review = ({navigation}) => {
  const [review, set_review] = useState("");
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus',
    () => {
    AsyncStorage.getItem('store_name', (err, result) => {
      let r = result
      r = r.replace('"','')
      r = r.replace('"','')
      fetch("http://192.168.219.141:8000/reviews/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
        }).then((response) => {
          return response.json()
        })
        .then(data=> {
          console.log(data)
          let d = []
          for(i in data.results){
            if(r==data.results[i].store_name){
              d.push(data.results[i]);
            }
          }
          set_review(d)
          })
          .catch(error => console.log(error))
    });
    });
}, [navigation]);
  return<>
      <View style={styles.flat_container}>
    <FlatList
      data= {review}
      renderItem={({item}) => 

      <View style = {{flex:1}}>
      <Text style={{marginTop:6,left:16, top:4,fontSize:20,color:'#BB86FC'}} >{item.nickname}님</Text>
      <View style = {{flexDirection:'row'}}>
      <Image style={{marginTop:6, left:16, height:12,width:12, borderRadius:25}}
                    source={require('./asset/image/star.png')}/>
      <Text style={{marginTop:6, left:16, fontSize:12,color:'white'}} >{item.star}</Text>
      </View>
      <Text style={{left:16, marginTop:8,fontSize:12,color:'white'}} >{item.comment}</Text>
      <View style = {{marginTop:8, height:1,width:'100%',backgroundColor:'#BB86FC'}}></View>
      </View>

      //<Text style={styles.items}>{item.store_name}</Text>
    }
      keyExtractor={(item, index) => index}

    />
  </View>
  </>
}
//한식/중식/일식,분식/치킨/피자,아시안/양식,족발/보쌈,카페/디저트,야식,프랜차이즈
const top_tab = () => {
  return(
    <Tab.Navigator
    initialRouteName="Feed"
      tabBarOptions={{
        scrollEnabled: true,
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#121212',
        },
        labelStyle: {
          textAlign: 'center',
          fontSize:12,
        },
        indicatorStyle: {
          borderBottomColor: '#BB86FC',
          borderBottomWidth: 2,
        },
      }}
    >
      <Tab.Screen name="전체보기" component={ta1} />
      <Tab.Screen name="한식/중식/일식" component={ta2} />
      <Tab.Screen name="분식/치킨/피자" component={ta3} />
      <Tab.Screen name="아시안/양식" component={ta4} />
      <Tab.Screen name="족발/보쌈" component={ta5} />
      <Tab.Screen name="카페/디저트" component={ta6} />
      <Tab.Screen name="야식" component={ta7} />
      <Tab.Screen name="프랜차이즈" component={ta8} />
    </Tab.Navigator>
  );
}
const ta1 = ({navigation}) => {
  const [store, set_store] = useState("");
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus',
    () => fetch("http://192.168.219.141:8000/storekeepers/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
        }).then((response) => {return response.json() })
        .then(data=> set_store(data.results))
        .catch(error => console.log(error))
    );
}, [navigation]);

  return<>
    <View style={styles.flat_container}>
    <FlatList
      data= {store}
      renderItem={({item}) => 
      <TouchableOpacity style={styles.category_flat} onPress={() =>{
        setItemToAsync('store_name',item.store_name)
        navigation.navigate('selected')
        }}>
      <Image
      style={{height:80,width:80,top:4,left:8, borderRadius:50}}
      source={{uri: item.store_img}}/>
      <View style = {{flex:1}}>
      <Text style={{left:16, top:4,fontSize:20,color:'white'}} >{item.store_name}</Text>
      <View style = {{flexDirection:'row'}}>
      <Image style={{top:8, left:16, height:12,width:12, borderRadius:25}}
                    source={require('./asset/image/star.png')}/>
      <Text style={{top:6, left:16, fontSize:12,color:'white'}} >0.0 리뷰 수 : 0</Text>
      </View>
      <Text style={{left:16, top:16,fontSize:12,color:'white'}} >배달팁: {item.delivery_fee}원</Text>
      
      </View>
      </TouchableOpacity>

      //<Text style={styles.items}>{item.store_name}</Text>
    }
      keyExtractor={(item, index) => index}

    />
  </View>
  </>
}
const ta2 = () => {
  return(
      <View>
        <Text>hi2</Text>
      </View>
  );
}
const ta3 = () => {
  return(
      <View>
        <Text>hi3</Text>
      </View>
  );
}
const ta4 = () => {
  return(
      <View>
        <Text>hi4</Text>
      </View>
  );
}
const ta5 = () => {
  return(
      <View>
        <Text>hi5</Text>
      </View>
  );
}
const ta6 = () => {
  return(
      <View>
        <Text>hi6</Text>
      </View>
  );
}
const ta7 = () => {
  return(
      <View>
        <Text>hi7</Text>
      </View>
  );
}
const ta8 = () => {
  return(
      <View>
        <Text>hi7</Text>
      </View>
  );
}
const all = () => {
  return<>
  <SafeAreaView style={{flex:1,backgroundColor:'#121212'}}>
    <ScrollView style = {{height:'80%'}}>
    {/*음식점 정보 */}
    <View style={{alignItems:'center',flexDirection: 'row',flex:1, backgroundColor:'#121212'}}>
            <Text style={styles.middle_title}>운영시간</Text>
    </View>
    <View style={{alignItems:'center',flexDirection: 'row',flex:1, backgroundColor:'#121212'}}>
            <Text style={styles.middle_title}>비운영시간</Text>
    </View>
    <View style={{alignItems:'center',flexDirection: 'row',flex:1, backgroundColor:'#121212'}}>
            <Text style={styles.middle_title}>매장전화</Text>
    </View>
    <View style={{alignItems:'center',flexDirection: 'row',flex:1, backgroundColor:'#121212'}}>
            <Text style={styles.middle_title}>배달팁</Text>
    </View>
    <View style={{alignItems:'center',flexDirection: 'row',flex:1, backgroundColor:'#121212'}}>
            <Text style={styles.middle_title}>카테고리</Text>
    </View>
      </ScrollView>
    </SafeAreaView>
      {/*bottom tab */}
      <View style={styles.bottom_tab}>
        <TouchableOpacity style={styles.bottom_tab_element} onPress={() => navigation.navigate('category')}>
                    <Image
                    style={{height:22,width:24,top:2, borderRadius:25}}
                    source={require('./asset/image/족발.jpg')}/>
                    <Text style={styles.element_text} >Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottom_tab_element} onPress={() => navigation.navigate('category')}>
                    <Image
                    style={{height:22,width:24,top:2, borderRadius:25}}
                    source={require('./asset/image/카페.jpg')}/>
                    <Text style={styles.element_text} >찜</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottom_tab_element} onPress={() => navigation.navigate('category')}>
                    <Image
                    style={{height:22,width:24,top:2, borderRadius:25}}
                    source={require('./asset/image/야식.jpg')}/>
                    <Text style={styles.element_text} >주문내역</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottom_tab_element} onPress={() => navigation.navigate('category')}>
                    <Image
                    style={{height:22,width:24,top:2, borderRadius:25}}
                    source={require('./asset/image/프랜차이즈.jpg')}/>
                    <Text style={styles.element_text} >My</Text>
        </TouchableOpacity>
        </View>
    </>
    
}

const isEmpty = function (value) {
  if (value === '' || value === null || value === undefined || (value !== null && typeof value === 'object' && !Object.keys(value).length)) {
    return true;
  } else {
    return false;
  }
};
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
      console.log(storageName,item);
    });
  });
};

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
  },
  TextInput2:{
    left:16,
    borderWidth:2,
    backgroundColor:'white',
    borderColor:'#BB86FC',
    borderRadius:8,
    paddingRight:8,
    height:40,
    width:300,
  },
  including_style:{
        top:10,
          height:'17%',
          justifyContent: 'space-between',
          flexDirection:'row',
          backgroundColor:'#121212',
          marginRight:16,
          marginLeft:16,
  },
  bottom_tab:{
        position: 'absolute',
         bottom: '0%',
         width: '25%',
         height:56,
         backgroundColor:'#121212',
         flexDirection:'row',
  },
  category_flat:{
    width: '100%',
    height: 120,
    flexDirection : 'row',
    flex:1,
    top:16,
    backgroundColor:'#121212',
    borderColor: 'gray',
    //borderWidth: 1,
    //justifyContent:'center',
  },
  cart_flat:{
    width: '100%',
    height: 50,
    flexDirection : 'row',
    flex:1,
    top:16,
    backgroundColor:'#121212',
    borderColor: 'gray',
    //borderWidth: 1,
    //justifyContent:'center',
  },
  element: {
    width: 80,
    height: 80,
    backgroundColor:'#121212',
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  element_text :{
    //fontWeight: 'bold',
    fontSize:12,
    color: '#fff',
    top:1,
  },
  flat_container: {
    flex: 1,
    backgroundColor:'#121212',
    //paddingTop: 22
    
   },
   cart_flat_container: {
    backgroundColor:'#121212',
    height:'80%',
   },
   items: {
     padding: 10,
     fontSize: 18,
     height: 44,
   },
   //section
   sectionHeader:{  //헤더 전체적인 스타일
    padding:4,
    backgroundColor:"#121212",    
},
sectionTitle:{ //텍스트
  fontSize:24,
  fontWeight:'bold',
  color:'#BB86FC',
  left:16,
},
menuStyle:{
  flex:1,
  fontWeight:'bold',
  justifyContent: 'space-between',
  textAlign:'center',
  flexDirection:'row',
  backgroundColor:'#121212',
  marginRight:16,
  marginLeft:16,
  height:40,
},
menuText:{
  fontSize:12,
  color:'white',
  fontWeight:'bold',
},
TextInput_col:{
  marginTop:10,
  borderWidth:2,
  backgroundColor:'white',
  borderColor:'#BB86FC',
  borderRadius:8,
  paddingRight:8,
  left:16,
  height:150,
  flexShrink:1,

  width:'90%',
},
info_title_text:{ //정보_타이틀
  fontSize:16,
  fontWeight:'bold',
  color:'white',
  left:16,
  marginBottom:16
},
info_content_text:{ //정보_본문
  fontSize:12,
  color:'white',
  left:16,
  marginBottom:16
},
});
export default AfterLogin;
