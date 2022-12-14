import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { CustomButton } from '../../Components/CustomButton';


export default class InstituteProfile extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.first}>
                    <Image source={{ uri: 'https://www.pinkvilla.com/files/styles/amp_metadata_content_image_min_696px_wide/public/zayn_malik_new_look.jpg?itok=r-t4ySDp' }} style={{ width: 120, height: 120, borderRadius: 80 }} />
                    <Text style={styles.name}>Hello, Zayn Mailk</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>

              
              
                <View style={{marginVertical:20}}>
                    <View style={{ marginHorizontal:50, padding:20, borderWidth:1,marginVertical:10,justifyContent:'center', borderRadius:10 }}><Text style={{fontSize:20, fontWeight:"bold"}}>Bio</Text></View>
                    <View style={{ marginHorizontal:50, padding:20, borderWidth:1,marginVertical:10,justifyContent:'center', borderRadius:10 }}><Text style={{fontSize:20, fontWeight:"bold"}}>Settings</Text></View>
                    <View style={{ marginHorizontal:50, padding:20, borderWidth:1,marginVertical:10,justifyContent:'center', borderRadius:10 }}><Text style={{fontSize:20, fontWeight:"bold"}}>Change Password</Text></View>
                    <View style={{ marginHorizontal:50, padding:20, borderWidth:1,marginVertical:10,justifyContent:'center', borderRadius:10 }}><Text style={{fontSize:20, fontWeight:"bold"}}>Terms & Conditions</Text></View>
                    <View style={{ marginHorizontal:50, padding:20, borderWidth:1,marginVertical:10,justifyContent:'center', borderRadius:10 }}><Text style={{fontSize:20, fontWeight:"bold"}}>Privacy Policy</Text></View>
                  
                </View>
                <View style={{width:100, justifyContent:'center', alignSelf:'center'}}>
                <CustomButton title="Log Out" />

                </View >
                <TouchableOpacity style={{justifyContent:'center',padding:20, alignItems:'center'}}>
                    <Text>Delete Acccount</Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    first: {
        alignItems: 'center', marginTop: 40
    },
    name: { fontSize: 18, lineHeight: 30, fontWeight: 'bold' }
    ,
    address: { color: 'grey', fontSize: 16, lineHeight: 30 }
    ,
    border: { borderBottomColor: '#352E50', borderBottomWidth: 1, marginHorizontal: 10 }
    ,
    heading: { flexDirection: 'row', marginHorizontal: 15, alignItems: 'center' }
    ,
    sharing: { fontSize: 18, marginVertical: 5, fontWeight: '500' }
    ,
    meal: { flexDirection: 'row', alignItems: 'center' }
    ,
    transport: { flexDirection: 'row', marginHorizontal: 20, marginVertical: 10, alignItems: 'center' }
    ,
    transportFont: { fontSize: 20, marginLeft: 10, fontWeight: 'bold' },
    permision: {
        flexDirection: "row",
        marginTop: 10,
        width: '70%'
    },
    accept: {
        paddingHorizontal: 10,
        borderColor: "green",
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: 5
    },
    time: {
        marginVertical: 5,
        marginLeft: 10
    }

});