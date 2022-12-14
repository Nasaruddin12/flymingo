import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { login } from "../Components/actionGet/SignIn";
import { Dimensions } from 'react-native';
import Route from "../navigation/Route";
import App from "../../App";



class SignIn extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  data: [],
                  emailId: '',
                  pass: '',
                  manager_id: '',
                  errorMessage: '',
                  loading: false,
            };
      }
      
      async onLogin() {
            console.log(this.state.emailId, this.state.pass);


            const { emailId, pass } = this.state;
            if (emailId != '' && pass != '') {
                  this.setState({ errorMessage: '' })
                  let action = await login(emailId, pass);
                    console.log("login", action)
                  if (action.status == 409) {
                        this.setState({ errorMessage: "NO user found" })
                        console.log(this.state.errorMessage);
                  } else if (action.status == 400) {

                        this.setState({ errorMessage: "pls enter correct password" })
                        console.log(this.state.errorMessage);
                  } else if(action.status == 200){

                         console.log("ho gaya party", action.data)
                        this.setState({ manager_id: action.data.id })
                        //  console.log("ye hai manager id", action.data.id);

                        await this.setState({ managerInfo: JSON.stringify(action.data) })
                        console.log(this.state.managerInfo);
                        try {
                              await AsyncStorage.setItem('managerInfo', JSON.stringify(action.data))
                              // console.log("Hogaya bhai partyyyyy");
                              //  console.log(JSON.stringify(action.data));
                        } catch (e) {
                              console.log(e);
                        }
                       
                        
                  }
            } else {
                  console.log("email and pass are null")
                  this.setState({ errorMessage: 'All fileds are required' })
                  console.log(this.state.errorMessage)
            }
      }


      render() {

            return (
                  <ScrollView>

                        <View style={styles.container}>

                              {this.state.loading ? (
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                          <ActivityIndicator size='large' color="blue" />
                                    </View>
                              ) : (
                                    <View>

                                          <Image source={require('../../assets/flytheme.png')}
                                                style={styles.wallpaper} />

                                          <View style={styles.uicontainer}>

                                                {this.state.errorMessage.length > 0 && <Text style={styles.textDanger}>{this.state.errorMessage}</Text>}
                                                <TextInput placeholder="Enter email id"
                                                      style={styles.textField}
                                                      textAlign={'center'}
                                                      selectionColor={'#cc1d63'}
                                                      placeholderTextColor={'#cc1d63'}
                                                      onChangeText={(text) => this.setState({ emailId: text })} />
                                                <TextInput placeholder="Enter password"
                                                      style={styles.textField}
                                                      textAlign={'center'}
                                                      selectionColor={'#cc1d63'}
                                                      placeholderTextColor={'#cc1d63'}
                                                      onChangeText={(text) => this.setState({ pass: text })} />

                                                <TouchableOpacity style={{ justifyContent: 'center' }}
                                                      onPress={() => this.onLogin()}
                                                >
                                                      <Text style={styles.text}>Sign In</Text>

                                                </TouchableOpacity>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 15, marginTop: 16 }}>
                                                      <Text style={{ fontSize: 18, fontWeight: "800" }}>New User? </Text>
                                                      <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                                                            <Text style={{ fontSize: 20, fontWeight: '900', textDecorationLine: 'underline' }}>Sign Up</Text>
                                                      </TouchableOpacity>
                                                </View>
                                          </View>
                                    </View>
                              )}
                        </View>

                  </ScrollView>

            );
      }
}
export default SignIn;
const screenHeight = Math.round(Dimensions.get("window").height);


const styles = StyleSheet.create({
      textField: {
            height: 50,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 8,
            margin: 12,
            fontSize: 22,
            fontWeight: '900',
            backgroundColor: 'transparent',
            color: 'black'

      },
      container: {
            width: '100%',
            height: Dimensions.get('window').height,

      },
      text: {
            height: 50,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 8,
            margin: 12,
            textAlign: 'center',
            paddingTop: 12,
            backgroundColor: '#42f5b9',
            fontWeight: '900',
            fontSize: 20,
      },
      wallpaper: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            height: screenHeight,
            width: '100%',
            opacity: 0.5,
      },
      uicontainer: {
            height: '100%',
            justifyContent: 'center'
      }, textDanger: {
            color: "#dc3545",
            fontSize: 18,
      },
})