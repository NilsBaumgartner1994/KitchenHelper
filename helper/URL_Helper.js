export class URL_Helper{

    static getCurrentLocationWithoutQueryParams(){
        return URL_Helper.getLocationWithoutQueryParams(window.location.href);
    }

    static getLocationWithoutQueryParams(url){
        return url.split('?')[0]; //https://stackoverflow.com/questions/5817505/is-there-any-method-to-get-the-url-without-query-string
    }

    static openLink(url){
        window.location = url;
    }

}