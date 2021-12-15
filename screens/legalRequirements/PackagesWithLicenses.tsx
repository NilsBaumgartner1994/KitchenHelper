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
import {MoreInformationButton} from "../../components/MoreInformationButton";

export const PackagesWithLicenses = (props) => {

	// corresponding componentDidMount
	useEffect(() => {

	}, [])

	function getUrlToPackageInformation(dependencyKey){
		return "https://www.npmjs.com/package/"+dependencyKey;
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

	function renderRowInformation(icon, label, content){
		if(!content){
			return null;
		}

		return(
			<TextWithIcon icon={icon} >
				<Text><Text bold={true}>{label+": "}</Text>{content}</Text>
			</TextWithIcon>
		)
	}

	function renderRowInformationLink(icon, url){
		if(!url){
			return null;
		}

		return(
			<TextWithIcon icon={icon} >
				<Link href={url} >
					<Text>{url}</Text>
				</Link>
			</TextWithIcon>
		)
	}

	function renderDownloadedInformations(dependencyKey, upperVersion, currentVersion, thirdpartyDependency){

		let url = thirdpartyDependency?.url;
		let repositoryUrl = thirdpartyDependency?.repository;

		let packageUrl = getUrlToPackageInformation(dependencyKey);
		let license = thirdpartyDependency?.licenses
		let publisher = thirdpartyDependency?.publisher
		let email = thirdpartyDependency?.email

		return(
			<View>
				{renderRowInformationLink("web", url)}
				{renderRowInformation("license", "License", license)}
				{renderRowInformation("account-circle", "Publisher", publisher)}
				{renderRowInformation("email", "Email", email)}
				{renderRowInformationLink("github", repositoryUrl)}
				<MoreInformationButton key={dependencyKey} content={thirdpartyDependency} />
			</View>
		)
	}

	function renderPackageInformations(dependencyKey, upperVersion, currentVersion, thirdpartyDependency){
		return (
			<View>
				<MyThemedBox _shadeLevel={3}>
					<View style={{padding: 4}}>
						{renderDownloadedInformations(dependencyKey, upperVersion, currentVersion, thirdpartyDependency)}
					</View>
				</MyThemedBox>
			</View>
		)
	}

	function renderPackage(dependencyKey, upperVersion, currentVersion, thirdpartyDependency){
		return (
			<View style={{paddingBottom: 10, width: "100%"}}>
				<ExpandableDrawerItem
					level={2}
					hasChildren={true}
					label={() => {return renderPackageLabel(dependencyKey, upperVersion, currentVersion, thirdpartyDependency)}}>
					{renderPackageInformations(dependencyKey, upperVersion, currentVersion, thirdpartyDependency)}
				</ExpandableDrawerItem>
			</View>
		);
	}

	return(
		<>
			{renderAllPackages()}
			<Text>{TextGenerator.getVeryLongText()}</Text>
		</>
	)
}