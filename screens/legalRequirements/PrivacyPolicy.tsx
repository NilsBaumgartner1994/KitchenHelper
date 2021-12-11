import React, {useEffect} from "react";
import {View} from "native-base";
import App from "../../App";

import privacyPolicyJson from "./PrivacyPolicy.json";
import {RenderHTML} from "../../utils/RenderHTML";

export const PrivacyPolicy = (props) => {

	App.setHideDrawer(false);

	// corresponding componentDidMount
	useEffect(() => {

	}, [props.route.params])

	return(
			<View>
				<RenderHTML html={privacyPolicyJson.content} />
			</View>
	)
}