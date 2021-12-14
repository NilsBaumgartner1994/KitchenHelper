import React, {useEffect, useState} from "react";
import {Link, Skeleton, Text, View} from "native-base";
import TextGenerator from "../../placeholder/TextGenerator";
import App from "../../App";
import currentpackageJson from "./../../../../package.json";
import {ExpandableDrawerItem} from "../../navigation/ExpandableDrawerItem";
import {MyThemedBox} from "../../helper/MyThemedBox";
import ServerAPI from "../../ServerAPI";
import axios from "axios";
import proxiedFetch from 'proxied-fetch';

export const License = (props) => {

	App.setHideDrawer(false);

	const [dependencyInformation, setDependencyInformation] = useState({});

	// corresponding componentDidMount
	useEffect(() => {

	}, [props.route.params])

	function getUrlToPackageInformation(dependencyKey){
		return "https://registry.npmjs.org/"+dependencyKey;
	}

	async function downloadRemotePackageInformations(dependencyKey, version){
		let url = getUrlToPackageInformation(dependencyKey);
		let informations = null;

		let getProvidersURL = ServerAPI.getAPIUrl()+"/auth";
		console.log("getProvidersURL: ",getProvidersURL);

		try{
			let answer = await axios.get(getProvidersURL);
			let providers = answer?.data?.data;
			console.log(providers);
		} catch (err){
			console.log(err)
		}

		try{
			let resp = await proxiedFetch(url);
			console.log(resp);
		} catch (err){
			console.log(err);
		}

		let copy = {...dependencyInformation}
		copy[dependencyKey] = JSON.stringify(informations);
		setDependencyInformation(copy)
	}

	function renderAllPackages(){
		let output = [];
		let dependencies = currentpackageJson?.dependencies || {};
		let dependencyKeys = Object.keys(dependencies);
		for(let dependencyKey of dependencyKeys){
			let version = dependencies[dependencyKey];
			output.push(renderPackage(dependencyKey, version));
		}
		return output;
	}

	function renderPackageLabel(dependencyKey, version){
		return <Text>{dependencyKey}</Text>
	}

	function renderDownloadedInformations(dependencyKey){
		let remoteInformations = dependencyInformation[dependencyKey]
		if(!remoteInformations){
			return (
				<Skeleton style={{width: "100%", height: 40}} />
			)
		}
	}

	function renderPackageInformations(dependencyKey, version){
		let url = getUrlToPackageInformation(dependencyKey);

		return (
			<MyThemedBox _shadeLevel={3}>
				<Link key={"Link: " + dependencyKey} href={url} >
					<Text>{url}</Text>
				</Link>
				{renderDownloadedInformations(dependencyKey)}
			</MyThemedBox>
		)
	}

	async function handlePressPackage(dependencyKey, version){
		setTimeout(() => {downloadRemotePackageInformations(dependencyKey, version)}, 1000)
	}

	function renderPackage(dependencyKey, version){
		return (
			<ExpandableDrawerItem
				level={2}
				hasChildren={true}
				onPress={() => {handlePressPackage(dependencyKey, version)}}
				label={() => {return renderPackageLabel(dependencyKey, version)}}>
				{renderPackageInformations(dependencyKey, version)}
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