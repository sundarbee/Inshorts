
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { ActionCreators } from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import React, { Component } from 'react';

function mapStateToProps(state) {
  return {
    sources: state.sources,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

class Details extends React.Component {

  static navigationOptions  = {
      title: 'Details'
    };


  constructor(props) {
      super(props);
      this.state = {
      }
    }


    componentWillMount(){
      console.log("WillMount:::::::");
    }

    componentDidMount() {

      console.log('ReduxValue:::::' + JSON.stringify(this.props.sources));

    }

    render() {
      return (
        <View style={styles.MainContainer}>


        </View>
      );
    }
  }

  const styles = StyleSheet.create({

   MainContainer :{
    justifyContent: 'center',
    flex:1,
    margin: 7,
    },

   rowViewContainer: {
     fontSize: 17,
     padding: 10
    },

    TextInputStyleClass:{
     textAlign: 'center',
     height: 40,
     borderWidth: 1,
     borderColor: '#009688',
     borderRadius: 7 ,
     backgroundColor : "#FFFFFF"
     }

  });

  export default connect(mapStateToProps, mapDispatchToProps)(Details);
