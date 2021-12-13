import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Box, useColorModeValue, useToken, View} from 'native-base';
import styleConfig from "../../../styleConfig.json"
import EnviromentHelper from "../EnviromentHelper";
import {RouteRegisterer} from "./RouteRegisterer";
import {navigationRef} from "./NavigatorHelper";
import {RegisteredRoutesMap} from "./RegisteredRoutesMap";

export const Root = (props) => {
	const [lightBg, darkBg] = useToken(
		'colors',
		[styleConfig.backgroundColor.light, styleConfig.backgroundColor.dark],
		'blueGray.900',
	);
	const bgColor = useColorModeValue(lightBg, darkBg);

	let subroute = "myapp/app/";
	try{
		let basePath = EnviromentHelper.getBasePath();
		subroute = basePath;
	} catch (err){
		console.log("Trying to get Basepath");
		console.log(err)
	}

	let prefixes = ["myapp:///"];
	const linking = RegisteredRoutesMap.getRouteLinkingConfig(subroute, prefixes);

	return (
		<NavigationContainer
			ref={navigationRef}
			// @ts-ignore //this is correct
			linking={linking}
			theme={{
				// @ts-ignore
				colors: { background: bgColor },
			}}
		>
			<View style={{flex: 1, width: "100%", backgroundColor: bgColor}}
			>
				{props.children}
			</View>
		</NavigationContainer>
	);
};
