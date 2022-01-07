import SyncStorage from 'sync-storage';
import {StorageKeys} from "./StorageKeys";
import {DefaultStorage} from "./DefaultStorage";

export class MyDirectusStorage extends DefaultStorage/** extends Storage */{

    static async init(){
        const data = await SyncStorage.init();
    }

    getStorageImplementation(){
        return SyncStorage;
    }

    get_cookie_config(){
        let sessionStorageConfig = null;
        let localStorageConfig = SyncStorage.get(StorageKeys.KEY_COOKIE_CONFIG);

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
        SyncStorage.set(StorageKeys.KEY_COOKIE_CONFIG, JSON.stringify(config));
    }
}