import React, {FunctionComponent} from 'react';
import {Button, Icon, Text} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {NavigatorHelper} from "../../navigation/NavigatorHelper";
import {Settings} from "./Settings";
import {TransparentTextButton} from "../../buttons/TransparentTextButton";

export interface AppState {
	onlyIcon?: boolean;
	transparent?: boolean;
}
export const SettingsButton: FunctionComponent<AppState> = (props) => {

	function handleOpen(){
		NavigatorHelper.navigate(Settings);
	}

	function renderOnlyIcon(){
		return (
			<Button key={"SettingsIcon"} style={{backgroundColor: "transparent"}} onPress={handleOpen} >
				<Icon as={MaterialCommunityIcons} name={"cog"}/>
			</Button>
		)
	}

	function renderLogoutText(){
		return(
			<TransparentTextButton key={"logoutTextButton"} onPress={handleOpen}>
				<Text>{"Settings"}</Text>
			</TransparentTextButton>
		)
	}

	let content = [];

	if(props.onlyIcon){
		content.push(renderOnlyIcon());
	} else {
		content.push(renderLogoutText());
	}

	return content
}