import React, {useEffect, useState} from "react";
import {Link, Skeleton, Text, View} from "native-base";
import TextGenerator from "../../placeholder/TextGenerator";
import App from "../../App";
import currentpackageJson from "./../../../../package.json";
import currentpackageJsonLock from "./../../../../package-lock.json";
import thirdpartyLicense from "./../../../../thirdpartyLicense.json";
import {ExpandableDrawerItem} from "../../navigation/ExpandableDrawerItem";
import {MyThemedBox} from "../../helper/MyThemedBox";
import {TextWithIcon} from "../../components/TextWithIcon";

export const License = (props) => {

	App.setHideDrawer(false);

	// corresponding componentDidMount
	useEffect(() => {

	}, [props.route.params])

	function getUrlToPackageInformation(dependencyKey){
		return "https://registry.npmjs.org/"+dependencyKey;
	}

	function renderAllPackages(){
		let output = [];
		let dependencies = currentpackageJson?.dependencies || {};
		let lockPackageDependencies = currentpackageJsonLock?.packages || {};

		let dependencyKeys = Object.keys(dependencies);
		for(let dependencyKey of dependencyKeys){
			let upperVersion = dependencies[dependencyKey];

			let keyInPackageLockDependency = "node_modules/"+dependencyKey;
			let packageLockDependency = lockPackageDependencies[keyInPackageLockDependency] || {};
			let currentVersion = packageLockDependency?.version;

			let thirdpartyDependency = thirdpartyLicense[dependencyKey+"@"+currentVersion];

			output.push(renderPackage(dependencyKey, upperVersion, currentVersion, thirdpartyDependency));
		}
		return output;
	}

	function renderPackageLabel(dependencyKey, upperVersion, currentVersion, thirdpartyDependencyn){
		return (
			<View>
				<Text>{dependencyKey}</Text>
			</View>
		)
	}

	function renderDownloadedInformations(dependencyKey, upperVersion, currentVersion, thirdpartyDependency){
		let url = getUrlToPackageInformation(dependencyKey);
		let license = thirdpartyDependency?.licenses || "unkown"
		let publisher = thirdpartyDependency?.publisher || "unkown"
		let email = thirdpartyDependency?.email || "unkown"

		return(
			<View>
				<TextWithIcon icon={"web"} >
					<Link key={"Link: " + dependencyKey} href={url} >
						<Text>{url}</Text>
					</Link>
				</TextWithIcon>
				<TextWithIcon icon={"license"} >
					<Text><Text bold={true}>{"License: "}</Text>{license}</Text>
				</TextWithIcon>
				<TextWithIcon icon={"account-circle"} >
					<Text><Text bold={true}>{"Publisher: "}</Text>{publisher}</Text>
				</TextWithIcon>
				<TextWithIcon icon={"email"} >
					<Text><Text bold={true}>{"Email: "}</Text>{email}</Text>
				</TextWithIcon>

				<Text>{JSON.stringify(thirdpartyDependency)}</Text>
			</View>
		)
	}

	function renderPackageInformations(dependencyKey, upperVersion, currentVersion, thirdpartyDependency){
		return (
			<View >
				<MyThemedBox _shadeLevel={3}>
					<View>
					{renderDownloadedInformations(dependencyKey, upperVersion, currentVersion, thirdpartyDependency)}
					</View>
				</MyThemedBox>
			</View>
		)
	}

	function renderPackage(dependencyKey, upperVersion, currentVersion, thirdpartyDependency){
		return (
			<ExpandableDrawerItem
				level={2}
				hasChildren={true}
				label={() => {return renderPackageLabel(dependencyKey, upperVersion, currentVersion, thirdpartyDependency)}}>
				{renderPackageInformations(dependencyKey, upperVersion, currentVersion, thirdpartyDependency)}
			</ExpandableDrawerItem>
		);
	}

	return(
		<>
			{renderAllPackages()}
			<Text>{TextGenerator.getVeryLongText()}</Text>
		</>
	)
}