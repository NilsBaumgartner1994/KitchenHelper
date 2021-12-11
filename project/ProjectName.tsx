import React, {FunctionComponent} from 'react';
import {Text, View} from "native-base";
import {ServerInfoHelper} from "../helper/ServerInfoHelper";
import {ServerInfo} from "@directus/sdk";
import ServerAPI from "../ServerAPI";

interface AppState {
	serverInfo?: ServerInfo;
	themedColor?: boolean;
}
export const ProjectName: FunctionComponent<AppState> = (props) => {
	const serverInfo = props.serverInfo || ServerAPI.tempStore.serverInfo;

	let project_name = ServerInfoHelper.getProjectName(serverInfo);
	let project_color = ServerInfoHelper.getProjectColor(serverInfo);

	let color = project_color;
	if(props.themedColor){
		color = null;
	}

	return(
		<View style={{flex: 1, marginTop: "2px", marginLeft: "16px", justifyContent: "center"}}>
			<Text fontSize="2xl" fontWeight={"bold"} color={color}>
				{project_name}
			</Text>
		</View>
	)
}