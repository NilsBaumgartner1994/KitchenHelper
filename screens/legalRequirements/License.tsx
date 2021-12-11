import React, {useEffect} from "react";
import {Text} from "native-base";
import TextGenerator from "../../placeholder/TextGenerator";
import App from "../../App";

export const License = (props) => {

	App.setHideDrawer(false);

	// corresponding componentDidMount
	useEffect(() => {

	}, [props.route.params])

	return(
		<>
			<Text>{TextGenerator.getVeryLongText()}</Text>
		</>
	)
}