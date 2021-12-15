import React, {useEffect} from "react";
import App from "../../App";
import {PackagesWithLicenses} from "./PackagesWithLicenses";

export const License = (props) => {

	App.setHideDrawer(false);

	// corresponding componentDidMount
	useEffect(() => {

	}, [props.route.params])

	return(
		<>
			<PackagesWithLicenses />
		</>
	)
}