import { NavigationContainer } from '@react-navigation/native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeStack } from './navigation';
import { Auth } from './navigation';

const AuthStack = createNativeStackNavigator();

export default class Route extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      isSignIn : false
     };
  }

  async componentDidMount(){
    console.log("hiii");
  }
  
  render() {
    console.log("hiii");
    return (
     
      <NavigationContainer>
      
      { this.state.isSignIn ? <HomeStack/> : <Auth /> }
    
      </NavigationContainer>
    )
  }
}
