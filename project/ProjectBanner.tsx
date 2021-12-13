import React, {FunctionComponent} from 'react';
import {Flex, View} from "native-base";
import {ServerInfo} from "@directus/sdk";
import {ProjectLogo} from "./ProjectLogo";
import {ProjectName} from "./ProjectName";
import ServerAPI from "../ServerAPI";

const titleBoxHeight = 64;

interface AppState {
	serverInfo?: ServerInfo;
}
export const ProjectBanner: FunctionComponent<AppState> = (props) => {
	const serverInfo = props.serverInfo || ServerAPI.tempStore.serverInfo;

	return(
		<View
			style={{flexDirection: "row" ,height: titleBoxHeight}}
		>
			<ProjectLogo serverInfo={serverInfo} />
			<ProjectName serverInfo={serverInfo} />
		</View>
	)
}