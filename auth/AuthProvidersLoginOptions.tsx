import React, {FunctionComponent, useEffect, useState} from 'react';
import ServerAPI from "../ServerAPI";
import {AuthProvider} from "./AuthProvider";
import {View} from "native-base";

export const AuthProvidersLoginOptions: FunctionComponent = (props) => {

	const showExternalLogins = true;

	const [firstFetch, setfirstFetch] = useState(true)
	const [authProviders, setAuthProviders] = useState(undefined)
	const [reloadnumber, setReloadnumber] = useState(0)
	const [serverInfo, setServerInfo] = useState({})

	async function loadServerInfo() {
		try{
			let serverInfoRemote = await ServerAPI.getServerInfo();
			setServerInfo(serverInfoRemote);
			setReloadnumber(reloadnumber+1);
		} catch (err){
			console.log("Error at get Server Info");
			console.log(err);
		}
	}

	async function fetchAuthProviders(){
		try{
			let providers = await ServerAPI.getAuthProviders();
			setAuthProviders(providers);
			setReloadnumber(reloadnumber+1);
		} catch (err){
			console.log(err)
		}
	}

	function renderAuthProvider(provider: any){
		return <AuthProvider key={provider?.name} provider={provider} serverInfo={serverInfo} />;
	}

	function renderAuthProviders(){
		if(showExternalLogins){
			let output = [];
			if(!!authProviders){
				for(let provider of authProviders){
					output.push(renderAuthProvider(provider))
				}
			}
			return (
				<View style={{flex: 1}}>
					{output}
				</View>
			);
		}
		return null;
	}

	// corresponding componentDidMount
	useEffect(() => {
		if(firstFetch){
			setfirstFetch(false);
			fetchAuthProviders();
			loadServerInfo();
		}
	}, [])


	return (
		<View style={{flex: 1}}>
			{renderAuthProviders()}
		</View>
	)
}