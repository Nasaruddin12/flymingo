import React, { useState, Component } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Image, ScrollView, Dimensions } from "react-native";
import DropdownComponent from "../Components/DropDownComponent";
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import CustomDropDown from "../Components/DropDownComponent";


class SignUp extends React.Component {
      constructor(props) {
            super(props);

            this.state = {
                  genderData: [
                        { 'type': 'Male' },
                        { 'type': 'Female' },
                        { 'type': 'other' },
                  ],
                  showDropDown: false,
                  Name: "",
                  email: "",
                  contactNumber: "",
                  password: "",
                  passwordErrorMessage: "",
                  confirmPassword: "",
                  confirmPasswordErrorMessage: "",
                  gender: "",
                  errorAll: "",


            };
      }

      async componentDidMount() {

      }
      async FormValided() {
            let error = false;
            console.log("enter in validation")
            console.log(this.state.gender)

            if (this.state.password.length == 0) {
                  error = true;
                  this.setState({ passwordErrorMessage: "Password is required feild" });
            } else if (this.state.password.length < 8) {
                  error = true;
                  this.setState({ passwordErrorMessage: "Password should be min 8 charachter" });
            } else if (this.state.password !== this.state.confirmPassword) {
                  error = true;
                  this.setState({ passwordErrorMessage: "Passwoad and confirm password should be same." });
            } else if (this.state.Name.length == 0 || this.state.contactNumber.length == 0 || this.state.email.length == 0) {
                  error = true;
                  this.setState({ errorAll: "All fileds are required." });
            }

            if (this.state.confirmPassword.length == 0) {
                  error = true;
                  this.setState({ confirmPasswordErrorMessage: "Confirm Password is required feild" });
            } else if (this.state.confirmPassword.length < 8) {
                  error = true;
                  this.setState({ confirmPasswordErrorMessage: "Password should be min 8 charachter" });
            }

            if (error) {
                  console.log("error");
                  /** Calling API */
            } else {
                  console.log('Name:' + this.state.Name)
                  console.log('Gender:' + this.state.gender)
                  console.log('email:' + this.state.email)
                  console.log('mobile:' + this.state.contactNumber)
                  console.log('password:' + this.state.password)

                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");

                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");

                  var raw = JSON.stringify({
                        "m_name": this.state.Name,
                        "m_email": this.state.email,
                        "m_number": this.state.contactNumber,
                        "m_password": this.state.password,
                        "m_gender": this.state.gender
                  });

                  var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                  };

                  await fetch("http://prof.flymingotech.in/public/api/store", requestOptions)
                        .then(response => response.json())
                        .then(result => {
                              // alert(result.data)
                              console.log("NNNNNN", result)
                              if (result.status) {
                                    return this.props.navigation.navigate('SignIn')
                              }

                        })
                        .catch(error => console.log(error));


                  if (result.status) {
                        this.props.navigation.navigate('SignIn')
                  }

            }

      }

      render() {
            return (
                  <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.container}>

                              <Image
                                    source={require('../../assets/flytheme.png')}
                                    style={styles.wallpaper} />


                              {this.state.errorAll.length > 0 && <Text style={styles.textDanger}>{this.state.errorAll}</Text>}
                              <View style={styles.uicontainer}>
                                    <TextInput
                                          textAlign={'center'}
                                          selectionColor={'#cc1d63'}
                                          placeholderTextColor={'#cc1d63'}
                                          placeholder="Enter full name"
                                          style={styles.textField}
                                          value={this.state.Name}
                                          onChangeText={(text) => this.setState({ Name: text })} />
                                    <TextInput
                                          textAlign={'center'}
                                          selectionColor={'#cc1d63'}
                                          placeholderTextColor={'#cc1d63'}
                                          placeholder="Enter moblie number"
                                          style={styles.textField}
                                          value={this.state.contactNumber}
                                          onChangeText={(text) => this.setState({ contactNumber: text })} />
                                    <TextInput
                                          textAlign={'center'}
                                          selectionColor={'#cc1d63'}
                                          placeholderTextColor={'#cc1d63'}
                                          placeholder="Enter email id"
                                          style={styles.textField}
                                          value={this.state.email}
                                          onChangeText={(text) => this.setState({ email: text })} />
                                    <TextInput
                                          textAlign={'center'}
                                          selectionColor={'#cc1d63'}
                                          placeholderTextColor={'#cc1d63'}
                                          placeholder="Enter password"
                                          style={styles.textField}
                                          secureTextEntry={true}
                                          value={this.state.password}
                                          onChangeText={(text) => this.setState({ password: text })}

                                    />
                                    {this.state.passwordErrorMessage.length > 0 && <Text style={styles.textDanger}>{this.state.passwordErrorMessage}</Text>}
                                    <TextInput
                                          textAlign={'center'}
                                          selectionColor={'#cc1d63'}
                                          placeholderTextColor={'#cc1d63'}
                                          placeholder="Confirm password"
                                          style={styles.textField}
                                          secureTextEntry={true}
                                          value={this.state.confirmPassword}
                                          onChangeText={(text) => this.setState({ confirmPassword: text })} />

                                    <View style={{ padding: 12 }}>

                                          <CustomDropDown
                                                placeholder='Gender'
                                                data={this.state.genderData}
                                                onChange={item => {

                                                      this.setState({ gender: item.type })
                                                }}
                                                value={this.state.gender}
                                                labelField='type'
                                                valueField='type'
                                          />
                                    </View>
                                    <TouchableOpacity
                                          style={{ justifyContent: 'center' }}
                                          onPress={() => this.FormValided()} >

                                          <Text style={styles.text}>Sign Up</Text>

                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 15 }}>
                                          <Text style={{ fontSize: 18, fontWeight: "600",color:'#fcf403' }}>You have alerdy Account ? </Text>
                                          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn', { userName: "Nasaruddin", otherParam: '101', })}>
                                                <Text style={{ fontSize: 21, fontWeight: 'bold',textDecorationLine:'underline',color:'#f5e9ec' }}>Sign In</Text>
                                          </TouchableOpacity>
                                    </View>
                              </View>

                        </View>
                  </ScrollView>
            )
      }
}

export default SignUp;

const screenHeight = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
      textField: {
            height: 50,
            borderColor: 'gray',
            borderWidth: 2,
            borderRadius: 8,
            paddingHorizontal: 8,
            margin: 12,
            fontSize: 18,
            fontWeight: '900',
            backgroundColor: 'transparent',
            color: 'black',

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
      textDanger: {
            color: "#dc3545"
      },
      wallpaper: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            height: screenHeight,
            width: '100%'
      },
      uicontainer: {
            height: '100%',
            justifyContent: 'center'
      }
})
