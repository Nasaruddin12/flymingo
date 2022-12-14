import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { Component } from 'react'




export class CustomTextInput extends Component {
    render() {
        return (
            <TextInput
                style={styles.input}
                placeholder={this.props.placeholder}
                keyboardType={this.props.keyboardType}
                secureTextEntry={this.props.secureTextEntry}
                onChangeText={this.props.onChangeText}
                value={this.props.value}
                onSubmitEditing={this.props.onSubmitEditing}
                autoCapitalize={this.props.autoCapitalize}
            />
        )
    }
}


const styles = StyleSheet.create({

    input: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        marginVertical: 10,
        height: 40,
        width: '100%',
        paddingLeft: 10
    }

})