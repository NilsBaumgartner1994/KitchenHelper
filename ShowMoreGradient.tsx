import React from "react";
import {useColorModeValue, useToken, View} from "native-base";
import styleConfig from "../../styleConfig.json";
import {LinearGradient} from "expo-linear-gradient";
import ShowMoreGradientPlaceholder from "./ShowMoreGradientPlaceholder";

export const ShowMoreGradient = (props) => {
	const [lightBg, darkBg] = useToken(
		'colors',
		[styleConfig.backgroundColor.light, styleConfig.backgroundColor.dark],
		'blueGray.900',
	);
	const bgColor = useColorModeValue(lightBg, darkBg);
	const gradColors = [bgColor+'00', bgColor+'FF'];

	return (
		<View style={[{width: "100%", position: "absolute", bottom: 0, height: "auto"}]}>
			<ShowMoreGradientPlaceholder />
			<View style={{position: "absolute", height: "100%", width: "100%", bottom: 0}}>
				<LinearGradient
					style={{flex: 4}}
					colors={gradColors}
					pointerEvents={'none'}
				/>
				<View style={{flex: 1, backgroundColor: bgColor}} />
			</View>
		</View>
	);
}