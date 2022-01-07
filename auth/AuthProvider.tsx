import React, {FunctionComponent} from 'react';
import {Flex, Icon, Link, Text, View,} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons"
import EnviromentHelper from "../EnviromentHelper";
import {StringHelper} from "../helper/StringHelper";
import {CSS_Helper} from "../helper/CSS_Helper";
import ServerAPI from "../ServerAPI";
import {URL_Helper} from "../helper/URL_Helper";

interface AppState {
	serverInfo: any;
	loading?: boolean,
	provider: any;
}

export const AuthProvider: FunctionComponent<AppState> = ({serverInfo, provider}) => {

	function getUrlToProvider(provider: string){
		provider= provider.toLowerCase();
		let currentLocation = URL_Helper.getCurrentLocationWithoutQueryParams();
		let redirectURL = currentLocation;
		let redirect_with_access_token = "?redirect="+ServerAPI.getAPIUrl()+"/redirect-with-token?redirect="+redirectURL+"?"+EnviromentHelper.getDirectusAccessTokenName()+"=";
		return ServerAPI.getAPIUrl()+"/auth/login/"+provider+redirect_with_access_token;
	}

	function renderIcon(icon, color){
		return (
			<Icon
				as={MaterialCommunityIcons}
				name={icon}
				color={customVIconStyle.color}
				style={{}}
			/>
		);
	}

	let providerName = provider?.name || "";
	let icon = provider?.icon;
	let project_color = serverInfo?.project?.project_color;
	let custom_css = serverInfo?.project?.custom_css || ""; // custom_css:
	let parsed_css = CSS_Helper.parseCssToSelectorMap(custom_css);

	let customSsoIconStyle = parsed_css?.[".sso-icon"] || {};
	let iconBackgroundColor = customSsoIconStyle?.background || project_color;

	let customVIconStyle = parsed_css?.[".v-icon"] || {};

	let url = getUrlToProvider(providerName);
	let providerNameReadable = StringHelper.capitalizeFirstLetter(providerName);

	return (
		<Link key={"Link"+providerName} href={url} >
			<Flex direction={"row"} _light={{backgroundColor: "rgb(240, 244, 249)"}} _dark={{backgroundColor: "darkgray"}} style={{borderRadius: 6, flex: 1, margin: 12}}>
				<View style={{height: 60, width: 60, alignItems: "center", justifyContent: "center", backgroundColor: iconBackgroundColor, borderRadius: 6}}>
					{renderIcon(icon, customVIconStyle.color)}
				</View>
				<View style={{justifyContent: "center", flex: 1, paddingLeft: 20}}>
					<Text>{"Log in with "+providerNameReadable}</Text>
				</View>
			</Flex>
		</Link>
	)
}