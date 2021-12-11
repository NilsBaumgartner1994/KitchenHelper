import React, {FunctionComponent} from 'react';
import {Flex} from "native-base";
import {ServerInfo} from "@directus/sdk";
import {ProjectLogo} from "./ProjectLogo";
import {ProjectName} from "./ProjectName";
import ServerAPI from "../ServerAPI";

const titleBoxHeight = "64px";

interface AppState {
	serverInfo?: ServerInfo;
}
export const ProjectBanner: FunctionComponent<AppState> = (props) => {
	const serverInfo = props.serverInfo || ServerAPI.tempStore.serverInfo;

	return(
		<Flex
			style={{height: titleBoxHeight, width: "auto"}}
			direction="row"
		>
			<ProjectLogo serverInfo={serverInfo} />
			<ProjectName serverInfo={serverInfo} />
		</Flex>
	)
}