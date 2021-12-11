import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {RegisteredRoutesMap} from "./RegisteredRoutesMap";
import {useBreakpointValue, useTheme, View} from "native-base";
import {CustomDrawerContent} from "./CustomDrawerContent";
import App from "../App";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function getStackScreens(){
	let output = [];

	console.log("getStackScreens");

	let routes = RegisteredRoutesMap.getRouteList();
	for(let route of routes){
		let routeConfig = RegisteredRoutesMap.getConfigForRoute(route);
		let screenName = routeConfig.screenName;
		let component = routeConfig.component;
		let template = routeConfig.template;
		let title = routeConfig.title;
		let key="RootStack:"+screenName;

		let content = (props) => {
			return React.createElement(component, props)
		};
		if(!!template){
			content = (props) => {
				let customProps = {title: title};
				let renderedComponent = React.createElement(component, {...props, ...customProps})
				return React.createElement(template, {...props, ...customProps, children: renderedComponent})
			};
		}

		output.push(
			<Drawer.Screen
				key={key}
				name={screenName}
				component={content}
				options={{
					title: title,
					headerLeft: null,
				}}
			/>
		)
	}
	return output;
}

// ! Dont put it down in the component !
const screens = getStackScreens(); //we save this here one, so the screens wont rerender every resize

export const RootStack = (props) => {

	let isSmallDevice = useBreakpointValue({
		base: true,
		md: false,
	})

	const theme = useTheme();

	// TODO do we have this?
	// navigationOptions={{unmountInactiveRoutes: true}}

	let largeScreenDrawerType = "front";

	const hideDrawer = App.shouldHideDrawer()
	if(!hideDrawer){
		largeScreenDrawerType = "permanent";
		//TODO need to hide on login screen
	}

	let drawerType = isSmallDevice ? 'front' : largeScreenDrawerType /** 'front' | 'back' | 'slide' | 'permanent' */
	let drawerStyleWidth =  isSmallDevice ? "100%" : theme.sidebarWidth;

	console.log("Render RootNavigator");

	//TODO maybe add Drawer instead of custom implementation: https://reactnavigation.org/docs/5.x/drawer-navigator
	return(
		<View flex={1} flexDirection={"row"}>
			<View flex={1}>
					<Drawer.Navigator
						drawerType={drawerType}
						swipeEnabled={false}
						drawerPosition={'left' /** | 'right' */}
						drawerContent={(props) => <CustomDrawerContent {...props} />}
						initialRouteName={RegisteredRoutesMap.getInitialRouteName()}

						screenOptions={{
							headerShown: false,
							unmountOnBlur:true
						}}>
						{screens}
					</Drawer.Navigator>
			</View>
		</View>
	)
}
/**

*/
