import React, {FunctionComponent, useEffect, useState} from 'react';
import {Icon, Image, View} from "native-base";
import {ServerInfoHelper} from "../helper/ServerInfoHelper";
import {ServerInfo, UserItem} from "@directus/sdk";
import ServerAPI from "../ServerAPI";
import {DirectusImage} from "./DirectusImage";
import {TouchableOpacity} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const titleBoxHeight = 64;

interface AppState {
	user?: UserItem;
	onPress?: () => {}
	heightAndWidth?: string
}
export const UserProfileAvatar: FunctionComponent<AppState> = (props) => {

	const [displayUser, setUser] = useState(props.user || null);
	const [reloadnumber, setReloadnumber] = useState(0)

	const directus = ServerAPI.getClient();

	async function loadUserInformation(){
		let me = await ServerAPI.getMe(directus);
		setUser(me);
		setReloadnumber(reloadnumber+1);
	}

	// corresponding componentDidMount
	useEffect(() => {
		if(!props.user){
			loadUserInformation();
		}
	}, [])

	let avatarAssetId = displayUser?.avatar;

	let content = (
		<Icon
			as={MaterialCommunityIcons}
			name={"account-circle"}
			style={{}}
		/>
	)
	if(!!avatarAssetId){
		content = <DirectusImage showLoading={true} assetId={avatarAssetId} style={{height: "100%", width: "100%"}} />;
	}


	let dimension = props.heightAndWidth || titleBoxHeight;

	if(!!props.onPress){
		return(
			// @ts-ignore
			<TouchableOpacity onPress={props.onPress} style={{height: dimension, width: dimension, borderRadius: 6, alignItems: "center", justifyContent: "center"}}>
				{content}
			</TouchableOpacity>
		)
	} else {
		return(
			// @ts-ignore
			<View style={{height: dimension, width: dimension, borderRadius: 6, alignItems: "center", justifyContent: "center"}}>
				{content}
			</View>
		)
	}
}