import {StorageKeys} from "./StorageKeys";
import {MyDirectusStorageInterface} from "./MyDirectusStorageInterface";
import {StorageImplementationInterface} from "./StorageImplementationInterface";

export class DefaultStorage implements MyDirectusStorageInterface/** extends Storage */{

    static async init(){

    }

    constructor() {
    }

    getStorageImplementation(): StorageImplementationInterface{
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

    is_guest(){
        return !!this.get(StorageKeys.KEY_COOKIE_IS_GUEST);
    }

    set_is_guest(isGuest){
        this.setValueOrDeleteIfNull(StorageKeys.KEY_COOKIE_IS_GUEST, isGuest)
    }

    set_refresh_token(token){
        this.setValueOrDeleteIfNull(StorageKeys.KEY_AUTH_REFRESH_TOKEN, token)
    }

    set_access_token(token){
        this.setValueOrDeleteIfNull(StorageKeys.KEY_AUTH_ACCESS_TOKEN, token)
    }

    setValueOrDeleteIfNull(key, value){
        if(!value){
            this.delete(key)
        } else {
            this.set(key, value);
        }
    }

    clear_credentials(){
        this.set_refresh_token(null);
        this.set_access_token(null);
        this.set_is_guest(false);
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