import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Alert,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
    Switch
} from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

import AntDesign from "react-native-vector-icons/AntDesign";

function CustomDrawer(props) {



    return (
        <DrawerContentScrollView {...props}>

            <View style={styles.container}>
                <TouchableOpacity  onPress={() => props.navigation.navigate('Profile')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', paddingVertical: 20, justifyContent: 'space-evenly', maxwidth: '100%' }}>
                    <Image
                     source={{ uri: 'https://static.remove.bg/remove-bg-web/581d704b6f77ec24f806185a708237a73ce0a356/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png' }} 
                    
                     style={styles.image} />
                    
                     <Text numberOfLines={1} style={styles.details}>Nasaruddin Shaikh</Text>
                </View>
                </TouchableOpacity>
                <DrawerItem
                    label="Dashboard"
                    onPress={() => props.navigation.navigate('Home')}
                    labelStyle={styles.font}
                />
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}></View>
                <DrawerItem
                    label="View Employee"
                    onPress={() => props.navigation.navigate('Employee')}
                    labelStyle={styles.font}
                />
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}></View>
                <DrawerItem
                    label="Add Employeye"
                    onPress={() => props.navigation.navigate('AddEmployee')}
                    labelStyle={styles.font}
                />
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}></View>
                <DrawerItem
                    label="View Student"
                    onPress={() => props.navigation.navigate('Student')}
                    labelStyle={styles.font}
                />
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}></View>

                <DrawerItem
                    label="Add Student"
                    onPress={() => props.navigation.navigate('AddStudent')}
                    labelStyle={styles.font}
                />
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}></View>
                <DrawerItem
                    label="View Course"
                    onPress={() => props.navigation.navigate('Course')}
                    labelStyle={styles.font}
                />
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}></View>

                <DrawerItem
                    label="Add Course"
                    onPress={() => props.navigation.navigate('AddCourse')}
                    labelStyle={styles.font}
                />
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}></View>
                <DrawerItem
                    label="Assign Course"
                    onPress={() => props.navigation.navigate('AssignCourse')}
                    labelStyle={styles.font}
                />
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}></View>
                
            </View>
            <View style={{ height: 50, backgroundColor: '#ccc', flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingHorizontal: 30, justifyContent: 'space-between', }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }} onPress={() => props.navigation.navigate('Logout')}>Log Out</Text>
                <AntDesign name='logout' size={20} />
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    font: {
        color: '#000000'
    },
    container: {
        paddingHorizontal: 15
    },
    image: {
        borderRadius: 50,
        height: 50,
        width: 50,
        marginRight: 20

    },
    details: {
        fontWeight: 'bold',
        fontSize: 16
    }

})

export default CustomDrawer;