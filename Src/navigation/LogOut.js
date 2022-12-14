import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import {
    View,
} from "react-native";
import App from "../../App";

class Logout extends Component {
    
    async componentDidMount(){
     await AsyncStorage.removeItem('managerInfo');
    
    }
    render() {
        return (
           <>
           <App />
           </>
        );
    }
}


export default Logout;
