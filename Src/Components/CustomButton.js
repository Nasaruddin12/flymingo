import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'


export class CustomButton extends Component {
    render() {
        return (
            <LinearGradient
                colors={['#352F4F', '#21589C']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.gradient}
                locations={[0, 0.9]}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.press}
                >
                    <Text style={styles.title}>{this.props.title}</Text>
                </TouchableOpacity>
            </LinearGradient>

        )
    }
}


const styles = StyleSheet.create({

    button: {
      
        padding: 10,

        alignItems: 'center',
        paddingVertical: 12,


    },
    title: {
        color: '#fff',
        fontSize: 18,

    },
    gradient: {
        width: '100%',
        borderRadius: 10,

    }
})