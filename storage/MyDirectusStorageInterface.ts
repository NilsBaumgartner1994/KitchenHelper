export interface MyDirectusStorageInterface{
    get(key: string);
    set(key: string, value: string);
    getAllKeys(): string[];
    delete(key: string);
    initContextStores();
    has_cookie_config(): boolean;
    has_credentials_saved(): boolean;
    set_cookie_config(any);
    clear_credentials();
}