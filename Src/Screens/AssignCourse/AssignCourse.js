import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getAllEmployee } from "../../Components/actionGet/Employe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomDropDown from "../../Components/DropDownComponent";
import { getAllCourse } from "../../Components/actionGet/Course";
import ExTouchableOpacity from "../../Components/ExTouchableOpacity";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

class AssignCourse extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  teacherData: [],
                  courseData: [],
                  manager_id: '',

                  teacherId: '',
                  courseId: '',
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



            await this.getEmployee()
            await this.getCourse()


      }
      async getEmployee() {
            console.log("pass id ", this.state.manager_id)
            let action = await getAllEmployee(this.state.manager_id)
            if (action.status == 200) {

                  this.setState({ employee: action.data })
                  console.log("empoloye data", this.state.employee);
            } else {

            }
      }
      async getCourse() {

            let action = await getAllCourse(this.state.manager_id)
            if (action.status == 200) {
                  this.setState({ course: action.data })
                  console.log("course data", this.state.course);
            } else {

            }
      }

      async AddAssignCourse() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                  "c_id": this.state.courseId,
                  "t_id": this.state.teacherId,
                  "m_id": this.state.manager_id
            });

            var requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
            };

            await fetch("http://prof.flymingotech.in/public/api/Add/AssCousre", requestOptions)
                  .then(response => response.text())
                  .then(result => {
                        console.log(result)
                        if (result.status == 200) {
                              alert("uploaded SuccessFully");

                              this.setState({ teacherName: ' ' })
                              this.setState({ courseName: '' })
                        }
                        else {
                              alert("uploaded SuccessFully");
                              this.setState({ teacherName: '' });
                              this.setState({ courseName: '' })
                        }
                  })
                  .catch(error => console.log('error', error));
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
                                          Assign Course
                                    </Text>
                              </ExTouchableOpacity>
                        </View>
                        <ScrollView>

                              <View style={{ marginTop: 20 }}>
                                    <View style={{ margin: 10 }}>
                                          <CustomDropDown
                                                placeholder='Select Teacher'
                                                data={this.state.employee}
                                                onChange={item => {

                                                      this.setState({ teacherId: item.e_id })

                                                }}
                                                value={this.state.teacherName}
                                                labelField='e_name'
                                                valueField='e_id'
                                          />


                                    </View>
                                    <View style={{ margin: 10 }}>
                                          <CustomDropDown
                                                placeholder='Select Course'
                                                data={this.state.course}
                                                onChange={item => {

                                                      this.setState({ courseId: item.c_id })

                                                }}
                                                value={this.state.courseName}
                                                labelField='c_name'
                                                valueField='c_id'
                                          />
                                    </View>
                                    <TouchableOpacity onPress={() => this.AddAssignCourse()}>
                                          <View style={{ marginTop: 10, justifyContent: "center", alignSelf: "center", borderWidth: 1 }}>
                                                <Text style={{ fontSize: 18, fontWeight: '900', padding: 10 }}> Assign Course to teacher</Text>
                                          </View>
                                    </TouchableOpacity>
                              </View>
                        </ScrollView>
                  </View>
            );
      }
}

export default AssignCourse;

const screenHeight = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
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