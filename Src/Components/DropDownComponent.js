import React, { useState, Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";


export default class CustomDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  async componentDidMount() {

  }
  renderLabel = () => {
    if (this.state.value || this.state.isFocus) {
      return (
        <Text style={[styles.label, this.state.isFocus && { color: '#352E50' }]}>
          {this.props.placeholder}
        </Text>
      );
    }
    return null;
  };


  render() {
    return (
      <View style={styles.container}>
        {this.renderLabel()}
        <Dropdown
          style={[styles.dropdown, this.state.isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={this.props.data}
          maxHeight={250}
          labelField={this.props.labelField}
          valueField={this.props.valueField}
          placeholder={!this.state.isFocus ? this.props.placeholder : ''}
          searchPlaceholder="Search..."
          Search={false | this.props.Search}
          value={this.props.value}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          // onChange={item => {
          //     this.setState({ value: item.value });
          //     this.setState({ isFocus: false });
          // }}

          renderRightIcon={() => (<FontAwesome5Icon name='caret-down' size={20} />)}

        />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {


    borderRadius: 8
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: 'transparent'
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 5,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold'
  },
  placeholderStyle: {
    fontSize: 20,
    color:'#cc1d63',
    textAlign:'center',
    fontWeight:'600'
  },
  selectedTextStyle: {
    fontSize: 18,
    color:'black',
    textAlign:'center',
    fontWeight:'600'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 100,
    fontSize: 16,
  },
});