import React, {useEffect} from "react";
import {Text} from "native-base";
import TextGenerator from "../../placeholder/TextGenerator";
import App from "../../App";

export const AboutUs = (props) => {

	App.setHideDrawer(false);

	// corresponding componentDidMount
	useEffect(() => {
		//console.log("About Us useEffect");
	}, [props.route.params])

	return(
		<>
			<Text>{TextGenerator.getVeryLongText()}</Text>
		</>
	)
}