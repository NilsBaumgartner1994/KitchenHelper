import React, {FunctionComponent} from 'react';
import {Flex, Icon, Link, Text, View,} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons"
import EnviromentHelper from "../EnviromentHelper";
import {StringHelper} from "../helper/StringHelper";
import {CSS_Helper} from "../helper/CSS_Helper";
import ServerAPI from "../ServerAPI";
import {URL_Helper} from "../helper/URL_Helper";
import {AuthProvider} from "./AuthProvider";
import {Provider} from "./Provider";
import App from "../App";
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {Home} from "../screens/home/Home";

interface AppState {
	serverInfo: any;
	loading?: boolean,
}

export const AuthProviderGuest: FunctionComponent<AppState> = ({serverInfo}) => {

	let provider: Provider = {
		name: "Guest",
		icon: "incognito-circle"
	};

	async function handleOpened(){
		console.log("Login als Gast");
		await App.setUserAsGuest();
		await NavigatorHelper.navigate(Home)
		await App.setHideDrawer(false);
	}

	return (
		<AuthProvider serverInfo={serverInfo} provider={provider} buttonText={"Continue in as Guest"} callback={handleOpened} />
	)
}