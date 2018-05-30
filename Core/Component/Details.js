
  import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert, Image } from 'react-native';
  import { ActionCreators } from '../actions'
  import { connect } from 'react-redux';
  import { bindActionCreators } from 'redux'
  import React, { Component } from 'react';
  import { YellowBox } from 'react-native';
  YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

  var pId;

  export default class Details extends React.Component {

    static navigationOptions  = {
        title: 'Details'
      };

      static navigationOptions = ({navigation}) => ({
        title: 'Details',
      });
    

    constructor(props) {
        super(props);
        this.state = {
          dImage:'',
          dTitle: '',
          dDescription: ''
        }
      }

      componentDidMount() {

        pId = this.props.navigation.state.params.name;
        this.setState({
        dImage : pId.urlToImage,
        dTitle : pId.title,
        dDescription : pId.description
        });
      }

      render() {
        return (
           <View>
            <Image
              style={{margin:10, width: 335, height: 150}}
              source={{uri: this.state.dImage}}
            />
            <Text style={{marginTop:20, marginLeft:10, fontSize: 18}}>
                {this.state.dTitle}
            </Text>
            <Text style={{marginTop:20, marginLeft:10, fontSize: 16}}>
                {this.state.dDescription}
            </Text>
           </View>
        );
      }
    }


