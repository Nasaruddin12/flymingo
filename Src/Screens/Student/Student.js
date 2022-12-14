import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View, StyleSheet,  } from "react-native";
import { getAllStudent } from "../../Components/actionGet/student";
import Icon from "react-native-vector-icons/AntDesign";
import { Dimensions } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import ExTouchableOpacity from "../../Components/ExTouchableOpacity";


class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      manager_id:''
    };
  }
  async componentDidMount(){
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
    console.log('Student', this.state.manager_id);

    await this.getStudent() 

  }

  async getStudent() {
    console.log("pass id ", this.state.manager_id)
    let action = await getAllStudent(this.state.manager_id)
    if (action.status == 200) {
      this.setState({ student: action.data })
    } else {

    }
  }
  onPressBackHandler() {
    console.log("here")
    this.props.navigation.goBack(null);
}
  render() {
    return (
    
      <View style={styles.container}>
      {this.state.loading ? (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <ActivityIndicator size='large' color="blue" />
          </View>
      ) : (

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
                    Students List
                </Text>
            </ExTouchableOpacity>
        </View>

        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          borderBottomWidth: 1, paddingHorizontal: 30, paddingVertical: 15, borderTopWidth: 1, 
        }}>
          <View style={{ width: 110 }}>
            <Text>Student Name</Text>
          </View>
          <Text>Id</Text>
          <Text>Edit</Text>
        </View>

        <FlatList

          style={{ marginBottom: 20 }}
          data={this.state.student}
          keyExtractor={item => item.s_id}

          renderItem={({ item }) =>

            <View style={{
              paddingHorizontal: 30, flexDirection: 'row', paddingVertical: 15, borderBottomColor: 'grey', borderBottomColor: '#42352E50',
              borderBottomWidth: 1, alignItems: 'center', justifyContent: 'space-between'
            }}>
              <View style={{ width: 150 }}>
                <Text style={{}}>
                  {item.s_name}
                </Text>
              </View>
              <Text>
                {item.s_id}
              </Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('UpdateStudent',{id: item.s_id})}>
                <Icon
                  name='edit'
                  style={{padding:10}}
                  color='blue'
                  size={20} />
              </TouchableOpacity>
              <TouchableOpacity >
                <Icon
                  name='delete'
                  size={20} 
                  color={'red'}/>
              </TouchableOpacity>
              </View>
            </View>
          }

        />
        </View>
      )}
      </View>
    
    );
  }
}

export default Student;

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