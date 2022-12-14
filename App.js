import React, { Component } from 'react';
import { View } from 'react-native';
import Auth, { HomeStack } from './Src/navigation/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged:false,
      data: [],
    };
  }
  async componentDidMount() {
    const value = await AsyncStorage.getItem('managerInfo');
    console.log("KNJKJK", value)
    if(value === null) {
this.setState({logged:false});
    } else {
      this.setState({logged:true});

    }
      console.log(value);
  }

  async shouldComponentUpdate(){
    const value = await AsyncStorage.getItem('managerInfo');
    //console.log("KNJKJK", value)
    if(value === null) {
    await this.setState({logged:false});
    } else {
      await this.setState({logged:true});

    }
      //console.log(value);
  }
  render() {
    return (
      <>
      {this.state.logged ? (
       
        <HomeStack />
       ): (
        <Auth />
        
       )}
  
      </>
    
      
    )
  }
}
