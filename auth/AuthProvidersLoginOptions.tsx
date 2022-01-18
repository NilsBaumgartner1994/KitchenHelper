import React, {FunctionComponent, useEffect, useState} from 'react';
import ServerAPI from "../ServerAPI";
import {AuthProvider} from "./AuthProvider";
import {View} from "native-base";
import {AuthProviderGuest} from "./AuthProviderGuest";

export const AuthProvidersLoginOptions: FunctionComponent = (props) => {

	const showExternalLogins = true;
	const showGuestLogin = true;

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
		return <AuthProvider key={"externalProvider"+provider?.name} provider={provider} serverInfo={serverInfo} />;
	}

	function renderAuthProviderGuest(){
		return <AuthProviderGuest serverInfo={serverInfo} key={"guest"} />
	}

	function renderAuthProviders(){
		let output = [];
		if(showGuestLogin){
			output.push(renderAuthProviderGuest());
		}

		if(showExternalLogins){
			if(!!authProviders){
				for(let provider of authProviders){
					output.push(renderAuthProvider(provider))
				}
			}
		}
		return (
			<View style={{flex: 1}}>
				{output}
			</View>
		);
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