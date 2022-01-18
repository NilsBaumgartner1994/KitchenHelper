import React, {useEffect, useState} from "react";
import {Button, Icon, Input, Pressable, Text, TextArea, View} from "native-base";
import {MyThemedBox} from "../../helper/MyThemedBox";
import App from "../../App";
import {SynchedVariable} from "./../../storage/SynchedVariable";
import {SettingsValue} from "./SettingsValue";
import {StorageKeys} from "../../storage/StorageKeys";
import {ThemeChanger} from "../../theme/ThemeChanger";
import ServerAPI from "../../ServerAPI";

export const DeveloperSettings = (props) => {

	// corresponding componentDidMount
	useEffect(() => {

	}, [props.route.params])

	function renderStorage(){
		let output = [];
		let allKeys = App.storage.getAllKeys();
		//console.log("renderStorage")
		for(let i=0; i<allKeys.length; i++){
			let storageKey = allKeys[i];
			//console.log("renderStorage: key: ", key);
			if(storageKey===StorageKeys.THEME){
				output.push(
					<MyThemedBox style={{margin: 5, padding: 5}} _shadeLevel={2} >
						<Text>{storageKey}</Text>
						<ThemeChanger><Text>{"Switch"}</Text></ThemeChanger>
					</MyThemedBox>
				)
			} else {
				output.push(
					<SynchedVariable storageKey={storageKey} key={storageKey}>
						<SettingsValue />
					</SynchedVariable>
				)
			}
		}

		return output;
	}

	function renderResetSettings(){
		return(
			<>
				<Text fontSize={30} bold={true}>DANGER:</Text>
				<MyThemedBox style={{margin: 5, padding: 5}} _shadeLevel={2} >
					<Text>{"Reset App"}</Text>
					<Button onPress={async () => {
						await ServerAPI.handleLogout()
						App.storage.deleteAll();
						}}><Text>{"Delete"}</Text></Button>
				</MyThemedBox>
			</>
		)
	}

	return(
		<>
			<View>
				<MyThemedBox>
					<Text fontSize={30} bold={true}>STORAGE:</Text>
					{renderStorage()}
				</MyThemedBox>
				{renderResetSettings()}
			</View>
		</>
	)
}