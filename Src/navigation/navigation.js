import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native'
import SignUp from '../Screens/SignUp';
import SignIn from '../Screens/SignIn';

import HomeScreen from '../Screens/Home/HomeScreen';
import UpdateEmployee from '../Screens/Employee/UpdateEmployee';
import UpdateStudent from '../Screens/Student/UpdateStudent';
import UpdateCourse from '../Screens/Course/UpdateCourse';
import AssignCourse from '../Screens/AssignCourse/AssignCourse';

import Employee from '../Screens/Employee/Employee';
import Student from '../Screens/Student/Student';
import Course from '../Screens/Course/Course';

import AddEmployee from '../Screens/Employee/AddEmployee';
import AddCourse from '../Screens/Course/AddCourse';
import AddStudent from '../Screens/Student/AddStudent';

import Logout from './LogOut';
import CustomDrawer from '../Components/CustomDrawer';
import InstituteProfile from '../Screens/Home/InstituteProfile';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const SignInheader = { headerTitle: 'Sign In' }
const SignUpheader = { headerTitle: 'Sign Up' }





export default function Auth() {
  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator>
      <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      
    </Stack.Navigator>
    </NavigationContainer>
  )
}


export function HomeStack() {
  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator>
      <Stack.Screen name='Dashbord' component={ManagerDrawer} options={{ headerShown: false }} />
  
      <Stack.Screen name='UpdateEmployee' component={UpdateEmployee} options={{ title: 'Update Employee' }} />
      <Stack.Screen name='UpdateStudent' component={UpdateStudent} options={{ title: 'Update Student' }} />
      <Stack.Screen name='UpdateCourse' component={UpdateCourse} options={{ title: 'Update Course' }} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export function ManagerDrawer() {
  return (

    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
      />
      <Drawer.Screen name="Profile" component={InstituteProfile} />
      <Drawer.Screen name="Employee" component={Employee} />
        <Drawer.Screen name='AddEmployee' component={AddEmployee} />
        <Drawer.Screen name="Student" component={Student} />
        <Drawer.Screen name="AddStudent" component={AddStudent} />
        <Drawer.Screen name="Course" component={Course} />
        <Drawer.Screen name='AddCourse' component={AddCourse} />
        <Drawer.Screen name='AssignCourse' component={AssignCourse} />
        <Drawer.Screen name="Logout" component={Logout} options={{ headerShown: false }}  />
    </Drawer.Navigator>
  );
}

