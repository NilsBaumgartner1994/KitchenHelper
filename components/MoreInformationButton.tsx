import React, {useEffect, useState} from "react";
import {Icon, Text, TextArea, View} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";
import {MyAlertDialog} from "../helper/MyAlertDialog";

export const MoreInformationButton= (props) => {

	const [showmore, setShowmore] = useState(props.showmore || false);

	// corresponding componentDidMount
	useEffect(() => {

	}, [])

	function renderAdvancedInformations(){
		let content =
			<TextArea
				h={"500px"}
				value={JSON.stringify(props.content, null, 4)}
				w={{
					base: "100%",
				}}
			/>

		return(
			<View key={""+showmore+props.key}>
				<TouchableOpacity onPress={() => {
					console.log("Set show more to true")
					setShowmore(true);
				}} >
					<Text><Icon as={MaterialCommunityIcons} name={props.icon || "dots-horizontal"}/></Text>
				</TouchableOpacity>
				<MyAlertDialog size={"full"} accept={"OK"} title={"More Informations"} content={content} onClose={() => {setShowmore(false); return false;}} onAccept={() => {setShowmore(false); return false;}} isOpen={showmore} />
			</View>
		)
	}

	return renderAdvancedInformations()
}