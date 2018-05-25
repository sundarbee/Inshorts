import NetworkManager from '../Network/NetworkManager'

// import {NetworkManager} from './Network'
import * as C from '../constants'

export function SourceAPI() {

  return NetworkManager.get(C.URL_TYPE_SOURCE,"").then(responseJson =>{
            return responseJson;
        }).catch((ex) => {
            console.log(ex);
            return ex;
        });
}
