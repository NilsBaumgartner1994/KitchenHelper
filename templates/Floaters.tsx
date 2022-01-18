import React from 'react';
import {Box, Fab, Icon, useColorMode, View} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import {ThemeChanger} from "../theme/ThemeChanger";

//TODO: https://docs.nativebase.io/stagger
export const Floaters = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	const renderedFab =
		<View style={{
			position: "absolute",
			bottom: 16,
			right: 16
		}}>
		<ThemeChanger key={"FabKey"}>
			<View
				style={{
					padding: 16,
					borderRadius: 32
				}}
				_dark={{
					bg: 'orange.50',
				}}
				_light={{
					bg: 'blueGray.900',
				}}
				shadow={7}
			>
				<Icon
					as={Ionicons}
					_dark={{ name: 'sunny', color: 'orange.400' }}
					_light={{ name: 'moon', color: 'blueGray.100' }}
					size="md"
				/>
			</View>
		</ThemeChanger>
		</View>;


	const renderedLogo = <Box
		// @ts-ignore
		size={{ base: 64, md: 450 }}
		zIndex={-1}
		opacity={0.4}
		_ios={{
			opacity: 0.6,
		}}
		// size={64}
		position="absolute"
		top={{ base: -80, md: -180 }}
		// top={-80}
		right={{ base: -60, md: -100 }}
	/>

	const renderedContent = [
		//renderedLogo,
		renderedFab
	];

	return (
		<>
			{renderedContent}
		</>
	);
};
