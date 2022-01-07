import {StorageKeys} from "./StorageKeys";
import {MyDirectusStorageInterface} from "./MyDirectusStorageInterface";

export class DefaultStorage implements MyDirectusStorageInterface/** extends Storage */{

    static async init(){

    }

    getStorageImplementation(){
        return null;
    }

    get_cookie_config(){
        return null;
    }

    has_cookie_config(): boolean{
       return !!this.get_cookie_config();
    }

    set_cookie_config(config){

    }

    set_refresh_token(token){
        if(!token){
            this.delete(StorageKeys.KEY_AUTH_REFRESH_TOKEN)
        } else {
            this.set(StorageKeys.KEY_AUTH_REFRESH_TOKEN, token);
        }
    }

    set_access_token(token){
        if(!token){
            this.delete(StorageKeys.KEY_AUTH_ACCESS_TOKEN)
        } else {
            this.set(StorageKeys.KEY_AUTH_ACCESS_TOKEN, token);
        }
    }

    clear_credentials(){
        this.set_refresh_token(null);
        this.set_access_token(null);
    }

    has_credentials_saved(){
        if(!!this.getAuthRefreshToken()){
            return true;
        }
        return !!this.getAuthAccessToken();
    }

    getAuthRefreshToken(){
        return this.getStorageImplementation().get(StorageKeys.KEY_AUTH_REFRESH_TOKEN);
    }

    getAuthAccessToken(){
        return this.getStorageImplementation().get(StorageKeys.KEY_AUTH_ACCESS_TOKEN);
    }

    set auth_token(token) {
        this.set(StorageKeys.KEY_AUTH_ACCESS_TOKEN, token);
    }

    get auth_token() {
        return this.getStorageImplementation().get(StorageKeys.KEY_AUTH_ACCESS_TOKEN);
    }
    get auth_expires() {
        return Number(this.getStorageImplementation().get(StorageKeys.KEY_AUTH_EXPIRES));
    }

    set auth_expires(time){
        this.set(StorageKeys.KEY_AUTH_EXPIRES, time+"");
    }

    set auth_refresh_token(token) {
        this.set(StorageKeys.KEY_AUTH_REFRESH_TOKEN, token);
    }
    get auth_refresh_token() {
        return this.getAuthRefreshToken();
    }

    get(key: string) {
        return this.getStorageImplementation().get(key);
        //return '';
    }

    set(key: string, value: string) {
        this.getStorageImplementation().set(key, value);
        return value;
    }
    delete(key: string) {
        this.getStorageImplementation().remove(key);
        return null;
    }
}