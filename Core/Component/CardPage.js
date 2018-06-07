import {
  Text,
  StyleSheet,
  View,
  ListView,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableHighlight,
  Image
} from "react-native";
import { ActionCreators } from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { Component } from "react";
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

import { ApiManager } from "../ApiManager";
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import FontAwesome, { Icons } from 'react-native-fontawesome';


function mapStateToProps(state) {
  return {
    sources: state.sources
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

let ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

class CardPage extends React.Component {
  static navigationOptions = {
    title: "Card Page"
  };

  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.state = {
      isLoading: true,
      cardValues: ds,
      cardLikeValues: ds,
      cardBookmarkValues: ds,
      
    };
  }

  componentDidMount() {
    console.ignoredYellowBox = ["Remote debugger"];
    console.log("sourcesize== "+JSON.stringify(this.props.sources));
      ApiManager.SourceAPI().then(responseJson => {
        var sources = responseJson.articles;
        for (var i = 0; i < sources.length; i++) {
          sources[i].Like = false;
          sources[i].Bookmark = false;
          sources[i].id = i;
        }

        this.props.set_sources(sources);

        this.setState(
          {
            isLoading: false,
            cardValues: ds.cloneWithRows(this.props.sources)
          }
        );
      });
      
  }

  GetListViewItem(title) {
    console.log('ClickedItem:::' + JSON.stringify(title.id));
    const { navigate } = this.props.navigation;
    navigate("DetailsScreen", {
      name: title
    });
  }

  onPressLike(likedItem, id) {
    var AvailableLikedItemIndex = this.props.sources.findIndex(i => i.id === likedItem.id);

    if (likedItem.Like) {
      likedItem.Like = false;
    } else {
      likedItem.Like = true;
    }
    const data = this.props.sources.slice();
    data[id] = likedItem;
    this.props.set_sources(data);
    this.setState({
      cardValues: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows(this.props.sources)
    });
  }

  onPressBookmark(bookmarkItem, id) {
    var AvailableBookmarkItemIndex = this.props.sources.findIndex(i => i.id === bookmarkItem.id);

    if (bookmarkItem.Bookmark) {
      bookmarkItem.Bookmark = false;
    } else {
      bookmarkItem.Bookmark = true;
    }
    const data = this.props.sources.slice();
    data[id] = bookmarkItem;
    this.props.set_sources(data);
    this.setState({
      cardValues: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows(this.props.sources)
    });
  }
  onTabPress(tabSelection){
    switch (tabSelection.i) {
      case 1:
      var data = [];
      for (var i = 0; i < this.props.sources.length; i++) {
        if(this.props.sources[i].Like){
          data.push(this.props.sources[i]);
        }
      }
      this.setState({
        cardLikeValues: new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        }).cloneWithRows(data)
      });
        break;
        case 2:
        var data = [];
        for (var i = 0; i < this.props.sources.length; i++) {
          if(this.props.sources[i].Bookmark){
            data.push(this.props.sources[i]);
          }
        }
        this.setState({
          cardBookmarkValues: new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
          }).cloneWithRows(data)
        });
          break;
      default:

    }
  }
  renderList(rowData, secId, rowId) {
    let likeImage;
    if (rowData.Like) {
      likeImage = (

        <Text style={{margin: 10, fontSize: 30, textAlign: 'left', color:'#2A39C8'}}>
          <FontAwesome>{Icons.thumbsUp }</FontAwesome>
          
        </Text>
       
      );
    } else {
      likeImage = (


        <Text style={{margin: 10, fontSize: 30, textAlign: 'left'}}>
          <FontAwesome>{Icons.thumbsUp }</FontAwesome>
          
        </Text>
      );
    }

    let bookmarkImage;

    if (rowData.Bookmark) {
      bookmarkImage = (
        <Text style={{margin: 10, fontSize: 30, textAlign: 'left', color:'#2A39C8'}}>
        <FontAwesome>{Icons.bookmark }</FontAwesome>
        
      </Text>
     
      );
    } else {
      bookmarkImage = (
        <Text style={{margin: 10, fontSize: 30, textAlign: 'left'}}>
        <FontAwesome>{Icons.bookmark }</FontAwesome>
        
      </Text>
     
      );
    }

    return (
      <View
        style={{
          margin: 10,
          backgroundColor: "#532D24",
          elevation: 10
        }}
      >
        <TouchableHighlight
          // style={styles.importBtnTouchableSelected}
          underlayColor="#03A9F455"
          onPress={() => this.GetListViewItem(rowData)}
        >
          <View>
            <View>
              <Image
                source={{
                  uri: rowData.urlToImage
                }}
                style={{
                  width: 400,
                  height: 200,
                  marginTop: 10
                }}
              />
            </View>
            <Text
              numberOfLines={1}
              style={{
                color: "#1D3A8F",
                fontSize: 22,
                marginLeft: 10
              }}
            >
              {rowData.title}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: "#8F1D83",
                fontSize: 18,
                marginLeft: 15
              }}
            >
              {rowData.description}
            </Text>
            <Text
              style={{
                color: "#1F8F1D",
                fontSize: 15,
                marginLeft: 12
              }}
            >
              {rowData.url}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.listlike}>
          <TouchableHighlight onPress={() => this.onPressLike(rowData, rowId)}>
            {likeImage}
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => this.onPressBookmark(rowData, rowId)}
          >
           {bookmarkImage}
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // ListViewItemSeparator = () => {
  //   return (
  //     <View
  //       style={{
  //         height: 0.5,
  //         width: "100%",
  //         backgroundColor: "#000"
  //       }}
  //     />
  //   );
  // };

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            paddingTop: 20
          }}
        >
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1
        }}
      >

      <ScrollableTabView
              style = {{marginTop: 20, }}
              onChangeTab={(tabSelection) => this.onTabPress(tabSelection)}
              renderTabBar={() => <DefaultTabBar />}
              tabBarBackgroundColor='#FFFFFF'
              tabBarActiveTextColor='#abde77'
              tabBarInactiveTextColor='#585858'
              textStyle={{ fontSize: 16 }}
            >

            <ScrollView tabLabel= 'CardDetails' style={styles.tabView}>
                <View style={{  margin:8, borderRadius: 10}}>
                 <View style={{flex: 1, }}>
                 <ListView
                    style={{
                      marginLeft: 5,
                      marginRight: 5,
                      marginTop: 10,
                      marginBottom: 10
                    }}
                    dataSource={this.state.cardValues}
                    renderRow={this.renderList.bind(this)}
                  />
                 </View>

                 </View>
            </ScrollView>


          <ScrollView tabLabel= 'Liked' style={styles.tabView}>
                <View style={{  margin:8, borderRadius: 10}}>
                <ListView
                    style={{
                      marginLeft: 5,
                      marginRight: 5,
                      marginTop: 10,
                      marginBottom: 10
                    }}
                    dataSource={this.state.cardLikeValues}
                    renderRow={this.renderList.bind(this)}
                  />

                 </View>
            </ScrollView>

            <ScrollView tabLabel= 'Bookmarks' style={styles.tabView}>
                <View style={{  margin:8, borderRadius: 10}}>
                <ListView
                    style={{
                      marginLeft: 5,
                      marginRight: 5,
                      marginTop: 10,
                      marginBottom: 10
                    }}
                    dataSource={this.state.cardBookmarkValues}
                    renderRow={this.renderList.bind(this)}
                  />

                 </View>
            </ScrollView>
            </ScrollableTabView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 7
  },

  rowViewContainer: {
    fontSize: 17,
    padding: 10
  },

  TextInputStyleClass: {
    textAlign: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#009688",
    borderRadius: 7,
    backgroundColor: "#FFFFFF"
  },
  listlike: {
    flex: 1,
    flexDirection: "row"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);
