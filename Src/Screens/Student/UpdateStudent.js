import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { getAStudent } from "../../Components/actionGet/update/student";
import CustomDropDown from "../../Components/DropDownComponent";



class UpdateStudent extends Component {
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
                  password: '',
                  mobile: '',
                  gender: '',
                  course: '',
                  courseType: '',
                  fees: '',
                  errorMessage: '',
                  manager_id: '',
                  student_id: '',
            };
      }

      async componentDidMount() {

            console.log(this.props.route.params);
            const id = this.props.route.params.id
            await this.setState({ student_id: id })
            console.log("student id is", this.state.student_id)

            await this.getStudent()


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

            await this.setState({ manager_id: this.state.managerInfo.data.id })
            console.log('bb', this.state.manager_id);

      }

      async getStudent() {
            console.log("pass id ", this.state.student_id)
            let action = await getAStudent(this.state.student_id)
            if (action.status == 200) {
                  this.setState({ student: action.data })
                  this.setState({name: this.state.student[0].s_name})
                  this.setState({email: this.state.student[0].s_email})
                  this.setState({password: this.state.student[0].s_password})
                  this.setState({mobile: this.state.student[0].s_number})
                  this.setState({gender: this.state.student[0].s_gender})
                  this.setState({course: this.state.student[0].s_course})
                  this.setState({courseType: this.state.student[0].s_courseType})
                  this.setState({fees: this.state.student[0].s_fees})
                  console.log("student name",this.state.name)
            } else {

            }
      }

      async UpdateStd() {
            console.log("add Student button is clickrd");
            let error = false;

            if (this.state.name.length == 0 || this.state.email.length == 0 ||
                  this.state.password.length == 0 || this.state.mobile.length == 0 ||
                  this.state.gender.length == 0 || this.state.course.length == 0
                  || this.state.course.length == 0 || this.state.courseType.length == 0
                  || this.state.fees.length == 0) {
                  error = true;
                  this.setState({ errorMessage: 'All filed are reqired' })

            } else if (this.state.mobile.length != 10) {
                  this.setState({ errorMessage: 'mobile no must be 10 digit' })
                  error = true;
            } else if (this.state.password.length < 8) {
                  error = false;
                  this.setState({ errorMessage: 'password must be 8 digit' })
            } else {
                  error = false
                  this.setState({ errorMessage: '' })

            }

            if (error) {
                  console.log(this.state.errorMessage);
            } else {

                  console.log('Name:' + this.state.name)
                  console.log('email:' + this.state.email)
                  console.log('password:' + this.state.password)
                  console.log('mobile:' + this.state.mobile)
                  console.log('gender:' + this.state.gender)
                  console.log('course:' + this.state.course)
                  console.log('Course Type:' + this.state.courseType)
                  console.log('fees:' + this.state.fees)
                  console.log("manager id", this.state.manager_id)

                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");

                  var raw = JSON.stringify({
                        "s_name": this.state.name,
                        "s_email": this.state.email,
                        "s_password": this.state.password,
                        "s_number": this.state.mobile,
                        "s_gender": this.state.gender,
                        "s_course": this.state.course,
                        "s_courseType": this.state.courseType,
                        "s_fees": this.state.fees,
                        "m_id": this.state.manager_id
                  });

                  var requestOptions = {
                        method: 'PUT',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                  };

                  await fetch("http://prof.flymingotech.in/public/api/student/update/"+this.state.student_id, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                              console.log(result)
                              if (result.status == 200) {
                                    alert("updated SuccessFully");
                                    this.props.navigation.goBack(null)      
                              }
                              else {
                                    alert("Something went wrong")
                              }
                        })
                        .catch(error => console.log('error', error));


            }



      }

      render() {
            return (
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
                              placeholder="Enter password"
                              style={styles.inputFiled}
                              value={this.state.password}
                              onChangeText={(text) => this.setState({ password: text })}
                        />
                        <TextInput
                              placeholder="Enter Mobile No"
                              style={styles.inputFiled}
                              value={this.state.mobile}
                              onChangeText={(text) => this.setState({ mobile: text })}
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
                              placeholder="Enter course"
                              style={styles.inputFiled}
                              value={this.state.course}
                              onChangeText={(text) => this.setState({ course: text })}
                        />
                        <TextInput
                              placeholder="Enter Cousre Type"
                              style={styles.inputFiled}
                              value={this.state.courseType}
                              onChangeText={(text) => this.setState({ courseType: text })}
                        />
                        <TextInput
                              placeholder="Enter Fees"
                              style={styles.inputFiled}
                              value={this.state.fees}
                              onChangeText={(text) => this.setState({ fees: text })}
                        />
                        <View style={{ marginTop: 10, justifyContent: "center", alignSelf: "center", borderWidth: 1 }}>
                              <TouchableOpacity onPress={() => this.UpdateStd()}>
                                    <Text style={{ fontSize: 18, fontWeight: '900', padding: 10 }}> Update Student</Text>
                              </TouchableOpacity>
                        </View>

                  </View>
                  </ScrollView>
            );
      }
}


export default UpdateStudent;

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
      }
})