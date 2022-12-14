import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import CustomDropDown from "../../Components/DropDownComponent";
import { Dimensions } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import ExTouchableOpacity from "../../Components/ExTouchableOpacity";



class AddEmployee extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  genderData: [
                        { 'type': 'Male' },
                        { 'type': 'Female' },
                        { 'type': 'other' },
                  ],
                  name: '',
                  email: '',
                  mobile: '',
                  role: '',
                  gender: '',
                  salary: '',
                  errorMessage: '',
                  manager_id: '',
            };
      }

      async componentDidMount() {
            try {

                  const value = await AsyncStorage.getItem('managerInfo');
                  console.log(value);
                  const data = JSON.parse(value);
                  console.log("andar value  ", data);
                  if (data != null) {
                        this.setState({ managerInfo: data });
                        // this.setState({ first_name: this.studentInfo.first_name });
                        console.log("andar", this.state.managerInfo.data.id);
                  }
            }
            catch (e) {
                  console.log("problem", e);
            }

            this.setState({ manager_id: this.state.managerInfo.data.id })
            console.log('bb', this.state.manager_id);
      }



      async AddEmp() {
            console.log("add employee button is clickrd");
            let error = false;

            if (this.state.name.length == 0 || this.state.email.length == 0 ||
                  this.state.mobile.length == 0 || this.state.role.length == 0 ||
                  this.state.gender.length == 0 || this.state.salary.length == 0) {
                  error = true;
                  this.setState({ errorMessage: 'All filed are reqired' })

            } else if (this.state.mobile.length != 10) {
                  this.setState({ errorMessage: 'mobile no must be 10 digit' })
                  error = true;
            } else {
                  error = false
                  this.setState({ errorMessage: '' })

            }

            if (error) {
                  console.log(this.state.errorMessage);
            } else {

                  console.log('Name:' + this.state.name)
                  console.log('email:' + this.state.email)
                  console.log('mobile:' + this.state.mobile)
                  console.log('role:' + this.state.role)
                  console.log('gender:' + this.state.gender)
                  console.log('salary:' + this.state.salary)
                  console.log("manager id", this.state.manager_id)

                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");

                  var raw = JSON.stringify({
                        "e_name": this.state.name,
                        "e_email": this.state.email,
                        "e_number": this.state.mobile,
                        "e_role": this.state.role,
                        "e_gender": this.state.gender,
                        "e_salary": this.state.salary,
                        "m_id": this.state.manager_id
                  });

                  var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                  };

                  await fetch("http://prof.flymingotech.in/public/api/emp/store", requestOptions)
                        .then(response => response.json())
                        .then(result => {
                              console.log(result)
                              if (result.status == 200) {
                                    alert("uploaded SuccessFully");

                                    this.setState({ name: '' })
                                    this.setState({ email: '' })
                                    this.setState({ mobile: '' })
                                    this.setState({ role: '' })
                                    this.setState({ gender: '' })
                                    this.setState({ salary: '' })
                              }
                              else {
                                    alert("Something went wrong")
                              }
                        })
                        .catch(error => console.log('error', error));


            }
      }
      onPressBackHandler() {
            console.log("here")
            this.props.navigation.goBack(null);
      }

      render() {
            return (
                  <View style={styles.container}>

                        <View style={styles.navigationBar}>
                              <ExTouchableOpacity
                                    onPress={() => this.onPressBackHandler()}
                                    style={styles.btnBack}
                              >
                                    <FontAwesome5Icon name="angle-left" color="#000" size={24} />
                              </ExTouchableOpacity>
                              <ExTouchableOpacity>
                                    <Text
                                          style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}
                                    >
                                          Add Employee
                                    </Text>
                              </ExTouchableOpacity>
                        </View>
                        <ScrollView>
                              <View style={{ marginTop: 20 }}>
                                    {this.state.errorMessage.length > 0 && (
                                          <Text style={{ color: 'red', marginLeft: 30 }}>
                                                {this.state.errorMessage}
                                          </Text>
                                    )}
                                    <TextInput
                                          placeholder="Enter Name"
                                          style={styles.inputFiled}
                                          value={this.state.name}
                                          onChangeText={(text) => this.setState({ name: text })}
                                    />
                                    <TextInput
                                          placeholder="Enter Email id "
                                          style={styles.inputFiled}
                                          value={this.state.email}
                                          onChangeText={(text) => this.setState({ email: text })}
                                    />

                                    <TextInput
                                          placeholder="Enter Mobile No"
                                          style={styles.inputFiled}
                                          value={this.state.mobile}
                                          onChangeText={(text) => this.setState({ mobile: text })}
                                    />

                                    <TextInput
                                          placeholder="Enter Role"
                                          style={styles.inputFiled}
                                          value={this.state.role}
                                          onChangeText={(text) => this.setState({ role: text })}
                                    />
                                    <View style={{ margin: 10 }}>
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
                                    <TextInput
                                          placeholder="Enter Salary"
                                          style={styles.inputFiled}
                                          value={this.state.salary}
                                          onChangeText={(text) => this.setState({ salary: text })}
                                    />
                                    <View style={{ marginTop: 10, justifyContent: "center", alignSelf: "center", borderWidth: 1 }}>
                                          <TouchableOpacity onPress={() => this.AddEmp()}>
                                                <Text style={{ fontSize: 18, fontWeight: '900', padding: 10 }}> Add Employee</Text>
                                          </TouchableOpacity>
                                    </View>

                              </View>
                        </ScrollView>

                  </View>
            );
      }
}


export default AddEmployee;


const screenHeight = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
      inputFiled: {
            height: 50,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 8,
            margin: 12,
            fontSize: 18,
            fontWeight: '600',
            backgroundColor: '#FFF',
      },
      inflow: {
            borderBottomColor: '#42352E50',
            borderBottomWidth: 1,
            paddingBottom: 20,
    
        },
        btnBack: {
            width: 50,
            alignItems: "center",
        },
        navigationBar: {
            paddingTop: 0,
            flexDirection: "row",
            backgroundColor: '#f7f7f7',
            height: 70,
            alignItems: "center",
            // justifyContent: "space-between",
            borderBottomWidth: 0.1,
            borderBottomColor: "#ddd",
        },
        container: {
            backgroundColor: "#fff",
            height: screenHeight,
            flex: 1,
    
        },
})