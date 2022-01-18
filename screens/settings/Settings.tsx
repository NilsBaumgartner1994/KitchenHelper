import React, {useEffect} from "react";
import {Button, Text, View} from "native-base";
import {NavigatorHelper} from "../../navigation/NavigatorHelper";
import {DeveloperSettings} from "./DeveloperSettings";

export const Settings = (props) => {

	// corresponding componentDidMount
	useEffect(() => {

	}, [props.route.params])

	function renderOpenDeveloperSettings(){
		return(
			<Button onPress={() => {
				NavigatorHelper.navigate(DeveloperSettings);
			}}
			><Text>{"Developer Settings"}</Text></Button>
		)
	}

	return(
		<>
			<View>
				{renderOpenDeveloperSettings()}
			</View>
		</>
	)
}