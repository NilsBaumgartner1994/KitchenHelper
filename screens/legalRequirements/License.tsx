import React, {useEffect} from "react";
import {Text} from "native-base";
import TextGenerator from "../../placeholder/TextGenerator";
import App from "../../App";
import packageJson from "./../../../../package.json";
import * as licenseReport from "license-report";

export const License = (props) => {

	App.setHideDrawer(false);

	// corresponding componentDidMount
	useEffect(() => {

	}, [props.route.params])

	function renderAllPackages(){
		let output = [];
		let dependencies = packageJson?.dependencies || {};
		let dependencyKeys = Object.keys(dependencies);
		for(let dependencyKey of dependencyKeys){
			let version = dependencies[dependencyKey];
			output.push(renderPackage(dependencyKey, version));
		}
		return output;
	}

	function renderPackage(dependency, version){
		return <Text>{dependency+" at version: "+version}</Text>;
	}

	return(
		<>
			{renderAllPackages()}
			<Text>{TextGenerator.getVeryLongText()}</Text>
		</>
	)
}