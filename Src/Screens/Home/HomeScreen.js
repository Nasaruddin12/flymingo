import { Component } from 'react'
import { View, Button, Text, FlatList, BackHandler, StyleSheet, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllStudent } from '../../Components/actionGet/student';
import ExTouchableOpacity from '../../Components/ExTouchableOpacity';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Dimensions } from "react-native";
import { CustomTextInput } from '../../Components/CustomTextInput';
import { getAllEmployee } from '../../Components/actionGet/Employe';
import { getAllCourse } from "../../Components/actionGet/Course";



class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manager_id: '',
      student: [],
      teacher: [],
      complaintData: [],
      loading: false,
      course:[],
    };
  }
  async componentDidMount() {
    this.setState({ loading: true })
    try {
      const value = await AsyncStorage.getItem('managerInfo');
      console.log(value);
      const data = JSON.parse(value);
      console.log("andar value  ", data);
      if (data != null) {
        this.setState({ managerInfo: data.data });
        // this.setState({ first_name: this.studentInfo.first_name });
        console.log("andar", this.state.managerInfo.id);
      }
    } catch (e) {
      console.log("problem", e);
    }
    this.setState({ manager_id: this.state.managerInfo.id }) +
      this.setState({ name: this.state.managerInfo.m_name })
    console.log('bb', this.state.manager_id);

    await this.getStudent();
    await this.getEmployee();
    await this.getCourse();

    this.setState({ loading: false })
  }

  getCourse = async() =>{
    console.log("pass id ", this.state.manager_id)
    let action = await getAllCourse(this.state.manager_id)
    if (action.status == 200) {
      this.setState({ course: action.data })
    }
  }

  getEmployee = async()=> {
    console.log("pass id ", this.state.manager_id)
    let action = await getAllEmployee(this.state.manager_id)
    if (action.status == 200) {
      this.setState({ teacher: action.data })
    }
  }

   getStudent = async()=> {
    console.log("pass id ", this.state.manager_id)
    let action = await getAllStudent(this.state.manager_id)
    if (action.status == 200) {
      this.setState({ student: action.data })
    } else {

    }
  }
  onPressBackHandler() {
    console.log("here")
    this.props.navigation.toggleDrawer();
  }

  render() {
    return (

      <View style={styles.Container}>
        {this.state.loading ? (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <ActivityIndicator size='large' color="blue" />
          </View>
        ) : (


          <View style={styles.Container}>
            <View style={styles.navigationBar}>
              <ExTouchableOpacity
                onPress={() => this.onPressBackHandler()}
                style={styles.btnBack}
              >
                <FontAwesome5Icon name="bars" color="#000" size={24} />
              </ExTouchableOpacity>
              <ExTouchableOpacity>
                <View style={{ justifyContent: 'flex-start', marginTop: 10, alignItems: 'flex-start' }}>
                  <Text
                    style={{ fontSize: 18, marginLeft: 20 }}
                  >
                    Hello, {this.state.name}   </Text>
                  <View style={{ marginLeft: 20, marginBottom: 20 }}>
                    <Text style={{ fontSize: 12, color: "green" }}>Let's manage everything.</Text>
                  </View>
                </View>

              </ExTouchableOpacity>

            </View>


            <View style={styles.header}>
              <View style={{ width: '80%', alignItems: "center", flexDirection: 'row', }}>
                <CustomTextInput placeholder='Search here' />
                <FontAwesome5Icon name='search' style={{ color: '#000', position: 'absolute', right: 10 }} size={18} />

              </View>

            </View>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <View style={styles.container}>


                {/* First section */}
                <Text >FEES</Text>


                <View style={styles.fees}>
                  <View style={{ width: '65%' }}>
                    <View style={styles.feesBox}>
                      <FontAwesome5Icon name='check-circle' style={{ color: '#009C35' }} size={1} />
                      <Text style={{ color: '#009C35', marginLeft: 5 }}>₹ 100000 Received Fees</Text>
                    </View>
                    <View style={styles.pendingFeesBox}>

                      <Text style={{ color: '#FF1F00', marginLeft: 5, }}>₹ 50000 Pending Fees</Text>
                    </View>
                  </View>
                  <View style={styles.TotalFees}>
                    <Text style={{ padding: 5 }}>Total Fees</Text>
                    <Text style={{ fontWeight: '700', fontSize: 18 }}>₹ 150000</Text>
                  </View>

                </View>



                {/* Second section */}

                <View style={styles.users}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    <Text>Teacher ({this.state.teacher.length})</Text>
                    <Text onPress={() => this.props.navigation.navigate('Employee')}>View All</Text>
                  </View>

                  {(this.state.teacher.length > 0) ? this.state.teacher.splice(0, 2).map((t, index) => (

                    <View style={styles.usersCard}>
                      <View style={{ flexDirection: 'row' }}>
                        <FontAwesome5Icon name='user' style={{ color: '#03053D' }} size={18} />
                        <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}>{t.name} </Text>
                      </View>

                      <View style={styles.userDetails}>
                        <Text style={styles.details}>{t.e_name}</Text>
                        <Text style={styles.details}>+91-{t.e_number}</Text>
                        <Text style={styles.details}>{t.e_role}</Text>
                      </View>

                    </View>

                  )) : <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                    <Text>No Users Found</Text>
                  </View>
                  }


                </View>


                {/* Third section */}



                <View style={styles.studentInflow}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    <Text>STUDENTS ({this.state.student.length})</Text>
                    <Text onPress={() => this.props.navigation.navigate('Student')}>View All</Text>
                  </View>
                  {(this.state.student.length > 0) ? this.state.student.splice(0, 2).map((s, index) => (

                    <View style={styles.inflow}>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: 'https://static.remove.bg/remove-bg-web/581d704b6f77ec24f806185a708237a73ce0a356/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png' }} style={styles.image} />
                        <Text style={{ width: 80 }}>{s.s_name}</Text>
                      </View>
                      <View >
                        <Text style={styles.details}>{s.s_number}</Text>
                      </View>
                      <View >
                        <Text style={styles.details}>{s.s_course}</Text>
                      </View>

                    </View>
                  )) : <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                    <Text>No Student Found</Text>
                  </View>
                  }


                </View>

                <View style={styles.studentInflow}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                  <Text>Course ({this.state.course.length})</Text>
                  <Text onPress={() => this.props.navigation.navigate('Student')}>View All</Text>
                </View>
                {(this.state.course.length > 0) ? this.state.course.splice(0, 2).map((c, index) => (

                  <View style={styles.inflow}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image  key={c.s_id} source={{ uri: 'https://static.remove.bg/remove-bg-web/581d704b6f77ec24f806185a708237a73ce0a356/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png' }} style={styles.image} />
                      <Text style={{ width: 80 }}>{c.c_name}</Text>
                    </View>
                    <View >
                      <Text
                     
                       style={styles.details}>{c.s_number}</Text>
                    </View>
                    <View >
                      <Text style={styles.details}>{c.s_course}</Text>
                    </View>

                  </View>
                )) : <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                  <Text>No Student Found</Text>
                </View>
                }


              </View>
                {/* Fourth section */}


                <View style={styles.Complaints}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    <Text>COMPLAINTS ({this.state.complaintData.length})</Text>
                    <Text>View All</Text>
                  </View>
                  {this.state.complaintData.slice(0, 2).map((comp, index) => (


                    <View style={styles.ComplaintsCards}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <View>
                          <Image source={{ uri: "https://static.remove.bg/remove-bg-web/581d704b6f77ec24f806185a708237a73ce0a356/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png" }} style={{ borderRadius: 40, width: 50, height: 50 }} />
                        </View>
                        <View style={{ marginLeft: 20 }}>
                          <Text style={styles.title}>{comp.complaintDesc}</Text>
                          <Text style={styles.class}>{comp.studName} {comp.courseName} {comp.className}</Text>
                        </View>
                      </View>

                    </View>
                  ))}

                </View>





              </View>
            </ScrollView>
          </View>
        )
        }
      </View>


    );
  }
}

export default HomeScreen;

const screenHeight = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#fff",
    height: screenHeight,
    flex: 1
  },

  fees: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginVertical: 10,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#DEE4EE',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: '15%'

  },
  feesBox: {
    borderRadius: 10,
    backgroundColor: '#B9F4CD',
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10

  },
  pendingFeesBox: {
    borderRadius: 10,
    backgroundColor: '#FFC2C2',
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginTop: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10


  },
  TotalFees: {
    width: '30%',
    backgroundColor: '#B9CCF4',
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 20

  },
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    flex: 1
  },
  users: {
    alignSelf: 'center',
    width: '100%',
    marginTop: 20,
    borderBottomColor: '#42352E50',
    borderBottomWidth: 1,
    paddingBottom: 20
  },
  usersCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 8,
    paddingTop: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 180,
    marginVertical: 10,
    paddingHorizontal: 20
  },
  userDetails: {
    width: '100%',
    backgroundColor: '#DFDDE363',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    alignSelf: 'center'
  },
  inflow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginVertical: 10,
    alignItems: 'center',
    borderBottomColor: '#42352E50',
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  studentInflow: {
    marginTop: 30,
    marginVertical: 10
  },
  ComplaintsCards: {
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 20
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 2,

  },
  class: {
    color: '#000',

  },
  Complaints: {
    marginTop: 20
  },
  btnBack: {
    width: 50,
    marginLeft: 10,
    alignItems: "center",
  },
  navigationBar: {
    paddingTop: 40,

    flexDirection: "row",
    backgroundColor: '#DDE3ED',
    height: 70,
    alignItems: "center",
    // justifyContent: "space-between",
    borderBottomWidth: 0,
    borderBottomColor: "#ddd",


  },
  image: {
    borderRadius: 40,
    height: 40,
    width: 40,
    marginRight: 20
  },
  details: {
    marginVertical: 5
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

})