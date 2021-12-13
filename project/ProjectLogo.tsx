import React, {FunctionComponent} from 'react';
import {Image, View} from "native-base";
import {ServerInfoHelper} from "../helper/ServerInfoHelper";
import {ServerInfo} from "@directus/sdk";
import {DirectusImage} from "./DirectusImage";
import ServerAPI from "../ServerAPI";

let titleBoxHeight = 60;

interface AppState {
	serverInfo?: ServerInfo;
	menuBar?: boolean
}
export const ProjectLogo: FunctionComponent<AppState> = (props) => {

	const serverInfo = props.serverInfo || ServerAPI.tempStore.serverInfo;
	let project_color = ServerInfoHelper.getProjectColor(serverInfo);
	let project_logo_asset_id = ServerInfoHelper.getProjectLogoAssetId(serverInfo)
	let padding = props.menuBar? 0 : 4;
	let borderRadius = props.menuBar? 0 : 6;
	const heightAndWidth = titleBoxHeight+padding;

	return(
		// @ts-ignore
		<View style={{height: heightAndWidth, width: heightAndWidth, backgroundColor: project_color, borderRadius: borderRadius, alignItems: "center", justifyContent: "center"}}>
			<DirectusImage alt={""}
						   assetId={project_logo_asset_id}
						   style={{height: 40, width: 40}} />
		</View>
	)
}