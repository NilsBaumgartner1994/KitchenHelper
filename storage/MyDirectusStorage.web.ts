import {StorageKeys} from "./StorageKeys";
import {DefaultStorage} from "./DefaultStorage";

export class MyDirectusStorage  extends DefaultStorage/** extends Storage */{

    static async init(){

    }

    getStorageImplementation(){
        //console.log("getStorageImplementation");
        let cookie_config = this.get_cookie_config();
        //console.log("cookie_config: ",cookie_config)
        let necessaryAccepted = this.get_cookie_config()?.necessary;
        //console.log("getStorageImplementation: necessaryAccepted: ",necessaryAccepted);
        return necessaryAccepted ? localStorage : sessionStorage;
    }

    get_cookie_config(){
        let sessionStorageConfig = sessionStorage.getItem(StorageKeys.KEY_COOKIE_CONFIG);
        let localStorageConfig = localStorage.getItem(StorageKeys.KEY_COOKIE_CONFIG);

        let usedCookieConfig = !!localStorageConfig ? localStorageConfig : sessionStorageConfig
        if(!!usedCookieConfig){
            try{
                return JSON.parse(usedCookieConfig);
            } catch (err){
                console.log(err);
            }
        }
        return null;
    }

    has_cookie_config(): boolean{
       return !!this.get_cookie_config();
    }

    set_cookie_config(config){
        if(config.necessary){
            localStorage.setItem(StorageKeys.KEY_COOKIE_CONFIG, JSON.stringify(config))
        } else {
            sessionStorage.setItem(StorageKeys.KEY_COOKIE_CONFIG, JSON.stringify(config))
        }
    }
}