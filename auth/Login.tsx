import React, {useEffect, useState} from "react";
import {WebViewLogin} from "./WebViewLogin";
import EnviromentHelper from "../EnviromentHelper";
import ServerAPI from "../ServerAPI";
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import App from "../App";
import {Platform} from "react-native";

export const Login = (props) => {

	let hideDrawer = false;

	if(!App.shouldHideDrawer()){
		//console.log("Login calls hide drawer");
		hideDrawer = true;
	}
	if(Platform.OS!=="web"){
		hideDrawer = false;
	}


	//console.log("Login passed drawer Check")

	const user = App.getUser();

	const [loaded, setLoaded] = useState(false);
	const [firstload, setFirstload] = useState(true);

	const params = NavigatorHelper.getRouteParams(props);
	let directus_access_token = params[EnviromentHelper.getDirectusAccessTokenName()];

	async function fetchAccessTokenInUrl(){
		//console.log("fetchAccessTokenInUrl: directus_access_token: ",directus_access_token);
		try{
			let directus = await ServerAPI.loginWithAccessDirectusAccessToken(directus_access_token);
			let me = await ServerAPI.getMe(directus);
			//console.log("Login user with token found: ", me);
			//NavigatorHelper.navigateWithoutParams(Login);
			await App.setUser(me);
			//await NavigatorHelper.navigateWithoutParams(Login)
			//console.log("fetchAccessTokenInUrl: me: ", me);
			return true;
		} catch (err){
			console.log(err);
			console.log(Object.keys(err));
			if(err.code === 401){
				console.log("Not allowed");
			}
			NavigatorHelper.navigateWithoutParams(Login);
		}
		//console.log("Navigate without Params");
		return false;
	}

	function rerenderWithoutParams(){
		//console.log("App has found user, so we want to route without directus token");
		// https://reactnavigation.org/docs/navigating-without-navigation-prop/#handling-initialization
		//since the navigation isn't ready at the first rendering, we need to retrigger useEffect to render it then
		if(firstload){
			setFirstload(false);
		} else {
			NavigatorHelper.navigateWithoutParams(Login);
		}
		return true;
	}

	async function fetchAccessToken(){
		//console.log("fetchAccessToken");
		if(!!directus_access_token){
			if(!!user){
				rerenderWithoutParams();
				return;
			} else {
				//console.log("Token in URL found");
				let successWithUrlToken = await fetchAccessTokenInUrl();
			}
		} else {
			//console.log("No access token in url, finish loading")
			setLoaded(true)
		}
	}

	// corresponding componentDidMount
	useEffect(() => {
		//console.log("Login useEffect")
		if(hideDrawer){
			App.setHideDrawer(true);
		} else {
			fetchAccessToken();
		}
	}, [props.route.params, firstload])

	let finishedLoading = loaded;

	if(!!directus_access_token){
		finishedLoading = false;
	}

	if(hideDrawer){
		return null;
	}

	return <WebViewLogin loaded={finishedLoading} user={user} />;
}