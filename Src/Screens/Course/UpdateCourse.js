import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { getACourse } from "../../Components/actionGet/update/Course";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import DateTimePickerModal from "react-native-modal-datetime-picker";



class UpdateCourse extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  name: '',
                  type: '',
                  duration: '',
                  fees: '',
                  sylabus: '',
                  errorMessage: '',
                  manager_id: '',
                  course_id: '',
                  DOB: '',
                  dobVisible: false,
                  startTime: '',
                  endTimeVisible: false,
                  endTime: '',
            };
      }

      async componentDidMount() {

            console.log(this.props.route.params);
            const id = this.props.route.params.id
            await this.setState({ course_id: id })
            console.log("course id", this.state.course_id)

            await this.getCourse()

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
      getDob(date) {
            console.log(date.toISOString().slice(0, 10).replace(/-/g, ""))
            this.setState({ DOB: date.toISOString().slice(0, 10) })
            this.setState({ dobVisible: false })
      }

      async getCourse() {
            console.log("pass id ", this.state.course_id)
            let action = await getACourse(this.state.course_id)
            if (action.status == 200) {
                  this.setState({ course: action.data })
                  this.setState({ name: this.state.course[0].c_name })
                  this.setState({ type: this.state.course[0].c_type })
                  this.setState({ duration: this.state.course[0].c_duration })
                  this.setState({ fees: this.state.course[0].c_fees.toString() })
                  this.setState({ sylabus: this.state.course[0].c_sylabus })
                  this.setState({ DOB: this.state.course[0].start_date })
                  this.setState({ startTime: this.state.course[0].c_start_time })
                  this.setState({ endTime : this.state.course[0].c_end_time})
                  console.log("Course name", this.state.name)
            } else {

            }
      }

      async UpdateCou() {
            console.log("update employee button is clickrd");
            let error = false;

            if (this.state.name.length == 0 || this.state.type.length == 0 ||
                  this.state.duration.length == 0 || this.state.fees.length == 0 ||
                  this.state.sylabus.length == 0) {
                  error = true;
                  this.setState({ errorMessage: 'All filed are reqired' })

            } else {
                  error = false
                  this.setState({ errorMessage: '' })

            }

            if (error) {
                  console.log(this.state.errorMessage);
            } else {

                  console.log('Name:' + this.state.name)
                  console.log('type:' + this.state.type)
                  console.log('Duration:' + this.state.duration)
                  console.log('fees:' + this.state.fees)
                  console.log('syllbus:' + this.state.sylabus)
                  console.log("manager id", this.state.manager_id)

                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");

                  var raw = JSON.stringify({
                        "c_name": this.state.name,
                        "c_type": this.state.type,
                        "c_duration": this.state.duration,
                        "c_fees": this.state.fees,
                        "c_sylabus": this.state.sylabus,
                        "start_date":this.state.DOB,
                        "c_start_time":this.state.startTime,
                        "c_end_time":this.state.endTime,
                        "m_id": this.state.manager_id
                  });

                  var requestOptions = {
                        method: 'PUT',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                  };

                  await fetch("http://prof.flymingotech.in/public/api/course/update/" + this.state.course_id, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                              console.log(result)
                              if (result.status == 200) {
                                    alert("uploaded SuccessFully");
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
                  <View style={{ marginTop: 15 }}>
                        {this.state.errorMessage.length > 0 && (
                              <Text style={{ color: 'red', marginLeft: 30 }}>
                                    {this.state.errorMessage}
                              </Text>
                        )}
                        <TextInput
                              placeholder="Enter Course Name"
                              style={styles.inputFiled}
                              value={this.state.name}
                              onChangeText={(text) => this.setState({ name: text })}
                        />
                        <TextInput
                              placeholder="Enter Course Type"
                              style={styles.inputFiled}
                              value={this.state.type}
                              onChangeText={(text) => this.setState({ type: text })}
                        />

                        <TextInput
                              placeholder="Enter Duration"
                              style={styles.inputFiled}
                              value={this.state.duration}
                              onChangeText={(text) => this.setState({ duration: text })}
                        />
                        <View style={styles.inputContainer}>
                              <TextInput
                                    style={styles.input}
                                    placeholder="Start Date"
                                    value={this.state.DOB}
                              />

                              <FontAwesome5Icon
                                    style={styles.icon}
                                    name="calendar-alt"
                                    color="#413D3E"
                                    onPress={() => this.setState({ dobVisible: true })}
                                    size={30} />


                        </View>
                        <View style={styles.inputContainer}>
                              <TextInput
                                    style={styles.input}
                                    placeholder="Class Start Time"
                                    value={this.state.startTime}
                                    onChangeText={(text) => this.setState({ startTime: text })}

                              />
                        </View>
                        <View style={styles.inputContainer}>
                              <TextInput
                                    style={styles.input}
                                    placeholder="Class End Time"
                                    value={this.state.endTime}
                                    onChangeText={(text) => this.setState({ endTime: text })}
                              />
                        </View>
                        <TextInput
                              placeholder="Enter Fees"
                              style={styles.inputFiled}
                              value={this.state.fees}
                              onChangeText={(text) => this.setState({ fees: text })}
                        />

                        <View>
                              <TextInput
                                    placeholder="Enter Syllbus"
                                    style={styles.input}
                                    multiline={true}
                                    value={this.state.sylabus}
                                    onChangeText={(text) => this.setState({ sylabus: text })}
                              />
                        </View>
                        <View style={{ marginTop: 10, justifyContent: "center", alignSelf: "center", borderWidth: 1 }}>
                              <TouchableOpacity onPress={() => this.UpdateCou()}>
                                    <Text style={{ fontSize: 18, fontWeight: '900', padding: 10 }}> Update Course</Text>
                              </TouchableOpacity>
                        </View>
                        <DateTimePickerModal
                              isVisible={this.state.dobVisible}
                              mode="date"
                              onConfirm={(date) => this.getDob(date)}
                              onCancel={() => this.setState({ dobVisible: false })}
                        />

                  </View>
                  </ScrollView>
            );
      }
}


export default UpdateCourse;

const styles = StyleSheet.create({
      inputFiled: {
            height: 50,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 8,
            margin: 10,
            fontSize: 18,
            fontWeight: '600',
            backgroundColor: '#FFF',
      },
      input: {

            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 8,
            margin: 10,
            fontSize: 18,
            fontWeight: '600',
            backgroundColor: '#FFF',
      },
      icon: {
            position: 'absolute',
            right: 20,
      },
})