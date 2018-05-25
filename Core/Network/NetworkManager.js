import * as C from '../constants'

class NetworkManager{
  static headers(){
    return {
      'Accept' : 'application/json',
      'Content-Type': 'application/x-ww-form-urlencoded',
    }
  }

  static headersWithAuth(contentType){
    return {
      'Accept' : 'application/json',
      'Content-Type': contentType
    }
  }

  static CallAPIFromURL(type,route,params,contentType,verb){

    const BASE_URL = 'https://newsapi.org/v1/articles?source=the-verge&apiKey=c7ee32ca71c0483cb984291c51490dc6';

    const url = BASE_URL + route;

    let options = Object.assign({method: verb}, params ? {body: params} : null);

    switch (type) {
      case C.URL_TYPE_SOURCE:
        options.headers = NetworkManager.headersWithAuth(contentType);
        break;
      default:
        options.headers = NetworkManager.headers();
    }

    return fetch(url, options).then((response) => response.json()).then((responseJson)=>{
      // console.log(responseJson);
      // if (responseJson.response_code === 'SUCCESS') {
        return responseJson;
      // }
      return responseJson.then(err => {throw err});
    }).then( responseJson => responseJson);

  }

// GET

static get(type, route){
  console.log(route);
  return this.CallAPIFromURL(type,route,null,null,'GET');
}


  // PATCH Request
  static patch(type,route, params) {
    console.log(route);
    return this.CallAPIFromURL(type, route, params, "application/json", 'PATCH');
  }

  // PUT request
  // we dont use put much but keeping it for now as reference.
  static put(route, params) {
    return this.CallAPIFromURL(route, params, null, 'PUT')
  }

  // POST request
  static post(type, route, params,contentType) {
    console.log(route);
    console.log(params);
    return this.CallAPIFromURL(type, route, params, contentType,'POST')
  }

  // Delete request
  static delete(route, params) {
    const apitype = 0; // we only delete from CRM apis ;
    return this.CallAPIFromURL(apitype, route, params, null, 'DELETE')
  }

}

export default NetworkManager
