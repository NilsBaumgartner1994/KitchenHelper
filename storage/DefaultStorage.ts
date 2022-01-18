import {StorageKeys} from "./StorageKeys";
import {MyDirectusStorageInterface} from "./MyDirectusStorageInterface";
import {StorageImplementationInterface} from "./StorageImplementationInterface";
import SynchedState from "../synchedstate/SynchedState";
import ColorCodeHelper from "../theme/ColorCodeHelper";

SynchedState.registerSynchedStates(StorageKeys.THEME, ColorCodeHelper.VALUE_THEME_DEFAULT, null, null, false);

export class DefaultStorage implements MyDirectusStorageInterface/** extends Storage */{

    static async init(){

    }

    constructor() {

    }

    defaultSaveStorageContext(storageKey, state, payload){
        try{
            this.set(storageKey, payload);
        } catch (err){
            console.log(err);
            return false;
        }
        return true;
    }

    initContextStores(){
        let keys = this.getAllKeys();
        for(let i=0; i<keys.length; i++){
            let storageKey = keys[i];
            let value = this.get(storageKey);
            SynchedState.registerSynchedStates(storageKey, value, this.defaultSaveStorageContext.bind(this), null, true);
        }
    }

    getAllKeys(): string[] {
        throw new Error("Method not implemented.");
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

    deleteAll(){
        let allKeys = this.getAllKeys();
        for(let i=0; i<allKeys.length; i++){
            this.delete(allKeys[i]);
        }
    }
}