import React from "react";
import {Icon, Text, View} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const TextWithIcon = (props) => {

	function renderRowInformation(icon, content){
		let renderedIcon = !!icon ? <Text><Icon as={MaterialCommunityIcons} name={icon} marginRight={15}/></Text> : null;

		return (
			<View style={{alignItems: "center", flexDirection: "row", margin: 3}}>
				{renderedIcon}<Text>{content}</Text>
			</View>
		)
	}

	return (renderRowInformation(props.icon, props.children))
}