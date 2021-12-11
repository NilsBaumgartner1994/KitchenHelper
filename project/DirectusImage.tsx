import React, {FunctionComponent, useState} from 'react';
import {Image, Pressable, View} from "native-base";
import ServerAPI from "../ServerAPI";
import App from "../App";
import {LoadingView} from "./LoadingView";
import {TouchableOpacity} from "react-native";

interface AppState {
	assetId: string;
	alt?: string;
	style?: any;
	showLoading?: boolean
	onPress?: () => {}
}
export const DirectusImage: FunctionComponent<AppState> = (props) => {

	const [loading, setLoading] = useState(true);
	// TODO: https://docs.directus.io/configuration/project-settings/#files-thumbnails
	// add key, fit, width, etc. as parameters here also


	//{height: "40px", width: "40px"}

	let content = null;

	if(!!props.assetId){
		let imageURL = ServerAPI.getAssetImageURL(props.assetId);
		let token = App.storage.getAuthAccessToken();
		let url = imageURL;
		if(!!url && !!token){
			if(!url.includes("?")){
				url+="?";
			}
			url+="&access_token="+token;
		}
		content = (<>
			<Image source={url} alt={props.alt} style={props.style} ignoreFallback={true}
				   onLoadEnd={() => {
					   setLoading(false)
				   }}
			/>
			{props.showLoading && loading && <LoadingView/>}
		</>)
	}

	let pressWrapper = content;

	if(!!props.onPress){
		pressWrapper = (
			<TouchableOpacity onPress={props.onPress} style={props.style} >
				{content}
			</TouchableOpacity>
		)
	}

	return(
		<View style={props.style}>
			{pressWrapper}
		</View>
	)
}