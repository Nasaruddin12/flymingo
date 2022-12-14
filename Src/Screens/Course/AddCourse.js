import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { CustomTextInput } from "../../Components/CustomTextInput";
import Watch from "react-native-vector-icons/Feather";
import ExTouchableOpacity from "../../Components/ExTouchableOpacity";


class AddCourse extends Component {
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
                  dobVisible: false,
                  DOB: '',
                  startTimeVisible: false,
                  startTime:'',
                  
                  endTimeVisible: false,
                  endTime:'',
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

      async AddCou() {
            console.log("add employee button is clickrd");
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
                  console.log(this.state.DOB);
                  console.log(this.state.startTime,);
                  console.log(this.state.endTime);

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
                        "m_id": this.state.manager_id,

                  });

                  var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                  };

                  await fetch("http://prof.flymingotech.in/public/api/course/store", requestOptions)
                        .then(response => response.json())
                        .then(result => {
                              console.log(result)
                              if (result.status == 200) {
                                    alert("uploaded SuccessFully");

                                    this.setState({ name: '' })
                                    this.setState({ type: '' })
                                    this.setState({ duration: '' })
                                    this.setState({ fees: '' })
                                    this.setState({ sylabus: '' })
                              }
                              else {
                                    alert("Something went wrong")
                              }
                        })
                        .catch(error => console.log('error', error));


            }



      }
      getDob(date) {
            console.log(date.toISOString().slice(0, 10).replace(/-/g, ""))
            this.setState({ DOB: date.toISOString().slice(0, 10) })
            this.setState({ dobVisible: false })
      }
      getStart(date) {
            console.log(date.toISOString().slice(14, 20).replace(/-/g, ""))
            this.setState({ startTime: date.toISOString().slice(14, 19) })
            this.setState({ startTimeVisible: false })
      }
      getTime(date) {
            console.log(date)
            console.log(date.toISOString().slice(0, 25).replace(/-/g, ""))
            this.setState({ endTime: date.toISOString().slice(14, 19) })
            this.setState({ endTimeVisible: false })
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
                              Add Course
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
                              placeholder="Enter Course Name"
                              on
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
                              <Watch 
                              // style={styles.icon}
                              //  name="watch"
                              //  color="#413D3E" 
                              //  onPress={() => this.setState({ startTimeVisible: true })} 
                              //  size={30} 
                              />


                        </View>
                        <View style={styles.inputContainer}>
                        <TextInput
                              style={styles.input}
                              placeholder="Class End Time"
                              value={this.state.endTime}
                              onChangeText={(text) => this.setState({ endTime: text })}
                        />
                        <Watch 
                        // style={styles.icon}
                        //  name="watch" 
                        //  color="#413D3E" 
                        //  onPress={() => this.setState({ endTimeVisible: true })} 
                        //  size={30}
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
                        <TouchableOpacity onPress={() => this.AddCou()}>
                        <View style={{ marginTop: 10, justifyContent: "center", alignSelf: "center", borderWidth: 1 }}>
                              
                                    <Text style={{ fontSize: 18, fontWeight: '900', padding: 10 }}> Add Course</Text>
                              
                        </View>
                        </TouchableOpacity>
                        <DateTimePickerModal
                              isVisible={this.state.dobVisible}
                              mode="date"
                              onConfirm={(date) => this.getDob(date)}
                              onCancel={() => this.setState({ dobVisible: false })}
                        />
                        <DateTimePickerModal
                              isVisible={this.state.startTimeVisible}
                              mode="time"
                              onConfirm={(date) => this.getStart(date)}
                              onCancel={() => this.setState({ dobVisible: false })}
                        />
                        <DateTimePickerModal
                              isVisible={this.state.endTimeVisible}
                              mode="time"
                              is24Hour={true}
                              onConfirm={(time) => this.getTime(time)}
                              onCancel={() => this.setState({ dobVisible: false })}
                        />

                  </View>
                  </ScrollView>
                  </View>
            );
      }
}


export default AddCourse;

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
      input: {

            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 8,
            margin: 12,
            fontSize: 18,
            fontWeight: '600',
            backgroundColor: '#FFF',
            width: 370
      },
      inputContainer: {

            flexDirection: 'row',
            alignItems: 'center'
      },
      icon: {
            position: 'absolute',
            right: 20,
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