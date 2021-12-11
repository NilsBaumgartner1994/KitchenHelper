import React, {FunctionComponent} from "react";
import {ScrollView, ScrollViewProps} from 'react-native';
import ShowMoreGradientPlaceholder from "./ShowMoreGradientPlaceholder";
import {ShowMoreGradient} from "./ShowMoreGradient";
import {View} from "native-base";

interface AppState {
	hideGradient?: boolean
}
export const ScrollViewWithGradient: FunctionComponent<AppState & ScrollViewProps> = (props) => {

	let hideGradient = props.hideGradient;
	let renderedGradient = hideGradient ? null : <ShowMoreGradient />

	return(
		<>
			<ScrollView
				style={props.style}
				contentContainerStyle={{ width: '100%', alignItems: "center" }}
				showsVerticalScrollIndicator={true}
			>
				{props.children}
			</ScrollView>
			{renderedGradient}
		</>
	)
}