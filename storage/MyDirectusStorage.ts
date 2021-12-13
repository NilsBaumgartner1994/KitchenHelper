import SyncStorage from 'sync-storage';

const KEY_AUTH_REFRESH_TOKEN = 'auth_refresh_token'
const KEY_AUTH_EXPIRES = 'auth_expires'
const KEY_AUTH_ACCESS_TOKEN = 'auth_token'
const KEY_COOKIE_CONFIG = 'cookie_config';

interface MyDirectusStorageInterface{
    get(key: string);
    set(key: string, value: string);
    delete(key: string);
    has_cookie_config(): boolean;
    has_credentials_saved(): boolean;
    set_cookie_config(any);
    clear_credentials();
}
export class MyDirectusStorage implements MyDirectusStorageInterface/** extends Storage */{

    static async init(){
        const data = await SyncStorage.init();
    }

    private getStorageImplementation(){
        return SyncStorage;
    }

    get_cookie_config(){
        let sessionStorageConfig = null;
        let localStorageConfig = SyncStorage.get(KEY_COOKIE_CONFIG);

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
        SyncStorage.set(KEY_COOKIE_CONFIG, JSON.stringify(config));
    }

    set_refresh_token(token){
        if(!token){
            this.delete(KEY_AUTH_REFRESH_TOKEN)
        } else {
            this.set(KEY_AUTH_REFRESH_TOKEN, token);
        }
    }

    set_access_token(token){
        if(!token){
            this.delete(KEY_AUTH_ACCESS_TOKEN)
        } else {
            this.set(KEY_AUTH_ACCESS_TOKEN, token);
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
        return this.getStorageImplementation().get(KEY_AUTH_REFRESH_TOKEN);
    }

    getAuthAccessToken(){
        return this.getStorageImplementation().get(KEY_AUTH_ACCESS_TOKEN);
    }

    set auth_token(token) {
        this.set(KEY_AUTH_ACCESS_TOKEN, token);
    }

    get auth_token() {
        return this.getStorageImplementation().get(KEY_AUTH_ACCESS_TOKEN);
    }
    get auth_expires() {
        return Number(this.getStorageImplementation().get(KEY_AUTH_EXPIRES));
    }

    set auth_expires(time){
        this.set(KEY_AUTH_EXPIRES, time+"");
    }

    set auth_refresh_token(token) {
        this.set(KEY_AUTH_REFRESH_TOKEN, token);
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