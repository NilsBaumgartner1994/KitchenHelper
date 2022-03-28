import React from 'react';
import {Box, Button, Heading, HStack, Icon, useBreakpointValue, useColorMode, View,} from 'native-base';
import {Floaters} from './Floaters';
import config from "../../../config.json";
import {SafeAreaTop} from "./SafeAreaTop";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {NavigatorHelper} from "../navigation/NavigatorHelper";

const padding = 0;

interface AppState {

}

export const Layout = ({
	children,
	navigation,
	title,
	doclink,
	navigateTo,
	_status,
	_hStack,
	...props
}: any) => {

	let isSmallDevice = useBreakpointValue({
		base: true,
		md: false,
	})

	const boxWidth = useBreakpointValue({
		"base": '100%',
		"md": 768-padding+'px',
		"lg": 992-padding+'px',
		"xl": 1536-padding+'px',
	})

	/**
	 'lg': 992+320,
	 'xl': 1280+320, // +280 from MenuWidth
	 '2xl': 1536+320,
	 */


	const { colorMode, toggleColorMode } = useColorMode();

	function renderHeading(){
		let color = !!props.headingTextColor ? props.headingTextColor : (colorMode == 'dark' ? 'white' : 'gray.800');
		let burgerButton = 	(
		<Button style={{backgroundColor: "transparent"}} onPress={NavigatorHelper.toggleDrawer} >
			<Icon as={MaterialCommunityIcons} name={"menu"} color={color}/>
		</Button>
		)

		if(!isSmallDevice){
			burgerButton = null;
		}

		return (
			<Heading
			color={color}
			// fontSize={{
			// 	lg: '3xl',
			// }}
			_web={{ py: 2 }}
			isTruncated
			>
				{burgerButton}
				{title ? title : config.title}
			</Heading>
		)
	}
	let backgroundStyle = !!props.headingBackgroundColor ? {backgroundColor: props.headingBackgroundColor} : undefined;
	return (
		<>
			<SafeAreaTop
				{..._status}
			/>
			<Box
				style={{paddingHorizontal: padding, margin: 0}}
				{...props}
				flex={1}
				px={4}
				mx="auto"
				pt={navigation ? '70px' : 0}
				width={"100%"}
				// style={{
				// 	backdropFilter: 'blur(10px)',
				// }}
			>
				<HStack
					left={0}
					top={0}
					right={0}
					px={4}
					zIndex={-1}
					{..._hStack}
					style={backgroundStyle}
				>
					<HStack py={2}
					// alignItems="flex-end"
					alignItems="center"
					w="100%"
					>

							{/* <HStack alignItems="center" justifyContent="center"> */}
								{/* <ChevronLeftIcon /> */}
								{renderHeading()}
							{/* </HStack> */}
							{/* <Text color={colorMode == 'dark' ? 'white' : 'gray.800'}>v3</Text> */}
					</HStack>
				</HStack>
				<View style={{width: "100%", flex: 1, alignItems: "center"}}>
							{children}
				</View>
			</Box>
			<Floaters />
		</>
	);

	// { base: '100%', lg: '768px', xl: '1080px' }
};
