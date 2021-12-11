import React, {createRef, FunctionComponent} from 'react';
import {WebView, WebViewNavigation} from 'react-native-webview';
import {SafeAreaView} from "react-native";
import {View} from "native-base";
import EnviromentHelper from "../EnviromentHelper";

let webViewRef = createRef<WebView>();

const FUNCTION_NAME_CHECK_COOKIES = "checkCookies"

const getJSCODEINJECTION = (backendURL: string) => {
	const CHECK_COOKIE: string = `	
	  ReactNativeWebView.postMessage("Cookie: " + document.cookie);
	  let `+FUNCTION_NAME_CHECK_COOKIES+` = async () => {
		try{
				console.log("Try to fetch");
				let answer = await fetch("`+backendURL+`/auth/refresh", {
					"headers": {
						"accept": "application/json, text/plain, */*",
						"accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
						"cache-control": "no-store",
						"pragma": "no-cache",
						"sec-gpc": "1"
					},
					"referrer": "`+backendURL+`/auth/refresh",
					"referrerPolicy": "strict-origin-when-cross-origin",
					"body": null,
					"method": "POST",
					"mode": "cors",
					"credentials": "include"
				});
				console.log(answer);
				let data = await answer.json();
				console.log(data);
				ReactNativeWebView.postMessage("Fetch: " + JSON.stringify(data));
			} catch (err){
				ReactNativeWebView.postMessage("Error: "+err);
				console.log(err);
			}
	  }
	  `+FUNCTION_NAME_CHECK_COOKIES+`();
	  true;
	`;
	return CHECK_COOKIE;
}

const onNavigationStateChange = (backendURL: string, navigationState: WebViewNavigation) => {
	console.log("onNavigationStateChange");
	console.log(navigationState.url);
		if(!!webViewRef){
			let injection = getJSCODEINJECTION(backendURL);
			webViewRef.current.injectJavaScript(FUNCTION_NAME_CHECK_COOKIES+"();");
		}
};

const onMessage = (setLoggedIn, event: any) => {
	console.log(webViewRef.current);
	console.log("WebViewLogin: On Message");

	const { data } = event.nativeEvent;

	if (data.includes('Cookie:')) {
		// process the cookies
		console.log(data);
	}
	if (data.includes('Cookie:') || data.includes('Fetch:') || data.includes('Error:')) {
		// process the cookies
		console.log(data);
	}
	if (data.includes('Fetch:')) {
		console.log(data);
		if(!data.includes("errors")){
			// process the cookies
			setLoggedIn(true);
		}
	}
};

interface AppState {
	loaded: boolean;
}
export const WebViewLogin: FunctionComponent<AppState> = (props) => {
	let backendURL = EnviromentHelper.getBackendURL();
	console.log("backendURL: ", backendURL);

	let injection = getJSCODEINJECTION(backendURL);

	// Send the cookie information back to the mobile app


	let sourceURI = backendURL+"/";
	//sourceURI = "https://github.com/";
	console.log("sourceURI: ",sourceURI);

	const setLoggedIn = props.setLoggedIn;

	return (
		<View style={{position: "absolute", top: 0, height: "100%", width: "100%", backgroundColor: "red"}}>
			<SafeAreaView />
			<WebView
				style={{backgroundColor: "green", height: "100%", width: "100%"}}
				ref={webViewRef}
				source={{uri: sourceURI}}
				onNavigationStateChange={(navigationState) => onNavigationStateChange(backendURL, navigationState)}
				onMessage={(event) => onMessage(setLoggedIn, event)}
				javaScriptEnabled={true}
				injectedJavaScript={'function myFunction() {\n' +
				'  alert("Hello! I am an alert box!");\n' +
				'}'}
				sharedCookiesEnabled
			>
			</WebView>
		</View>
	)
}