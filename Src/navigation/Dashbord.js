import { View, Button, Text, BackHandler } from 'react-native'
import React, { Component } from 'react'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Home/HomeScreen';
import Employee from '../Screens/Employee/Employee';
import Student from '../Screens/Student/Student';
import Course from '../Screens/Course/Course';
import SignUpStack, { Auth } from './navigation';
import AddEmployee from '../Screens/Employee/AddEmployee';
import AddCourse from '../Screens/Course/AddCourse';
import AddStudent from '../Screens/Student/AddStudent';
import AssignCourse from '../Screens/AssignCourse/AssignCourse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Route from './Route';
import Logout from './LogOut';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

class Dashbord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manager_id: '',
    };
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  render() {
    return (


      <Drawer.Navigator initialRouteName="Home">
       
        <Drawer.Screen name="ViewProfile" component={HomeScreen} />
        <Drawer.Screen name="Employee" component={Employee} />
        <Drawer.Screen name='AddEmployee' component={AddEmployee} />
        <Drawer.Screen name="Student" component={Student} />
        <Drawer.Screen name="AddStudent" component={AddStudent} />
        <Drawer.Screen name="Course" component={Course} />
        <Drawer.Screen name='AddCourse' component={AddCourse} />
        <Drawer.Screen name='AssignCourse' component={AssignCourse} />
        <Drawer.Screen name="Logout" component={Logout} options={{ headerShown: false }} />

      </Drawer.Navigator>

    );
  }
}

export default Dashbord;