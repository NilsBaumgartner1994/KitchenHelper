import React, {FunctionComponent, useContext} from 'react';
import {Text, Box, Button, Heading, HStack, Icon, useBreakpointValue, useColorMode, View,} from 'native-base';
import {Floaters} from './Floaters';
import config from "../../../config.json";
import {SafeAreaTop} from "./SafeAreaTop";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {NavigatorHelper} from "../navigation/NavigatorHelper";

const padding = 16;

interface AppState {

}

export const BreakPointLayout = ({
	children,
	navigation,
	title,
	doclink,
	navigateTo,
	_status,
	_hStack,
	...props
}: any) => {

	const boxWidth = useBreakpointValue({
		"base": '100%',
		"md": 768-padding+'px',
		"lg": 992-padding+'px',
		"xl": 1536-padding+'px',
	})

	return (
			<Box
				style={{padding: padding, flex: 1, margin: 0 ,alignItems: "flex-start"}}
				{...props}
				flex={1}
				px={4}
				mx="auto"
				pt={navigation ? '70px' : 0}
				width={boxWidth}
			>
					{children}
			</Box>
	);

	// { base: '100%', lg: '768px', xl: '1080px' }
};
