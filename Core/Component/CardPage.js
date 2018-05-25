
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert, TouchableHighlight, Image } from 'react-native';
import { ActionCreators } from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import React, { Component } from 'react';

import { ApiManager } from '../ApiManager'

function mapStateToProps(state) {
  return {
    sources: state.sources,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// var arrayholder = [] ;
class CardPage extends React.Component {

  static navigationOptions  = {
      title: 'Card Page'
    };


  constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        cardValues: []
        
      }
    }

    componentDidMount() {

      console.ignoredYellowBox = ['Remote debugger'];
      ApiManager.SourceAPI().then((responseJson) => {
        console.log('Response:::' + JSON.stringify(responseJson));
        this.props.set_sources(responseJson.articles);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          cardValues: ds.cloneWithRows(responseJson.articles),
        }, function() {
          // In this block you can do something with new state.
          // arrayholder = responseJson.sources ;
        });
      });

    }

    GetListViewItem (title) {
    //  Alert.alert(fruit_name);
     const {navigate} = this.props.navigation;
     navigate('DetailsScreen', { name: ''})
    }

  

    ListViewItemSeparator = () => {
      return (
        <View
          style={{
            height: .5,
            width: "100%",
            backgroundColor: "#000",
          }}
        />
      );
    }


    render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }

      return (
        <View style={{flex: 1, }}>
               <ListView
                style={{marginLeft: 5, marginRight: 5, marginTop: 10, marginBottom:10, }}
                   dataSource={this.state.cardValues}
                   renderRow={
                       (rowData) =>
                       <View style ={{margin:10, backgroundColor:'#532D24',elevation: 10}}>
                       <TouchableHighlight
                        // style={styles.importBtnTouchableSelected}
                        underlayColor= "#03A9F455"
                        onPress={
                          () =>this.GetListViewItem(rowData)
                        }>

                        <View>
                        <View>
                          <Image source={{uri: rowData.urlToImage}}
                          style={{width: 400, height: 200, marginTop:10}} />
                        </View>
                         <Text numberOfLines={1} style= {{ color: '#1D3A8F',fontSize:22, marginLeft:10}}>{rowData.title} </Text>
                         <Text numberOfLines={1} style= {{ color: '#8F1D83',fontSize:18, marginLeft:15}}>{rowData.description} </Text>
                         <Text style= {{ color: '#1F8F1D',fontSize:15,  marginLeft:12}}>{rowData.url} </Text>
                         </View>
                         </TouchableHighlight>

                        <View  style={styles.listlike}>
                         <TouchableHighlight   onPress={
                             () =>this.onPressButton(rowData)
                           }>
                           <Image
                             style={{width: 30, height: 30, marginTop:10, marginBottom:10, marginLeft:10}}
                             source={require("./../images/like.png")}
                           />
                         </TouchableHighlight>

                         <TouchableHighlight   onPress={
                             () =>this.onPressButton(rowData)
                           }>
                           <Image
                             style={{width: 30, height: 30, marginTop:10, alignSelf: 'flex-end', marginBottom:10, marginLeft:10}}
                             source={require("./../images/bookmark.jpeg")}
                           />
                         </TouchableHighlight>

                        </View>
                        </View>
                  }
               >
               </ListView>
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
     },
     listlike: {
      flex: 1,
      flexDirection: 'row'
    }

  });

  export default connect(mapStateToProps, mapDispatchToProps)(CardPage);
