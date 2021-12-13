import React from 'react';
import {NativeBaseProvider} from 'native-base';
import nativebaseConfig from '../../nativebase.config';
import {Root} from './navigation/RootComponent';
import ColorCodeManager from "./theme/ColorCodeManager";
import BaseThemeGenerator from "./theme";
import {RootStack} from "./navigation/rootNavigator";
import {ColorStatusBar} from "./ColorStatusBar";
import {MyDirectusStorage} from "./storage/MyDirectusStorage";
import ServerAPI from "./ServerAPI";
import {RouteRegisterer} from "./navigation/RouteRegisterer";
import Project from "../project/Project";
import {Linking, LogBox} from "react-native";
import * as ExpoLinking from "expo-linking";
import {URL_Helper} from "./helper/URL_Helper";
import {NavigatorHelper} from "./navigation/NavigatorHelper";

if(!!LogBox){
	LogBox.ignoreLogs([
		'Warning: isMounted(...) is deprecated', // works
		'Module RCTImageLoader', // works
		'Require cycle:', // doesn't work
	])
}

export default class App extends React.Component{

	static storage = null;
	static instance = null;

	static plugin = null;

	constructor(props) {
		super(props);
		App.instance = this;
  		App.storage = new MyDirectusStorage();
		App.plugin = Project;
  		RouteRegisterer.register();
  		RouteRegisterer.loadDrawerScreens();
		this.subscribe(( url ) => {
			let baseurl = ExpoLinking.createURL("");
			let screenURL = url.substr(baseurl.length);
			let urlSplit = screenURL.split("?");
			let route = urlSplit[0];
			let params = URL_Helper.getAllUrlParams(url);
			NavigatorHelper.navigateToRouteName(route, params);
		})
		this.state = {
			loadedUser: false,
		 	reloadNumber: 0,
			hideDrawer: false,
		}
	}


// Custom function to subscribe to incoming links
	subscribe(listener) {
		// First, you may want to do the default deep link handling
		const onReceiveURL = ({url}: { url: string }) => {
			listener(url);
		};

		// Listen to incoming links from deep linking
		Linking.addEventListener('url', onReceiveURL);
		return () => {
			// Clean up the event listeners
			Linking.removeEventListener('url', onReceiveURL);
		};
	}

	async loadServerInfo(){
		try{
			let serverInfoRemote = await ServerAPI.getServerInfo();
		} catch (err){
			console.log("Error at get Server Info: ",err);
		}
	}

	async loadRole(user){
		return await ServerAPI.getRole(user);
	}

	static shouldHideDrawer(){
		return App.instance.state.hideDrawer;
	}

	static async setHideDrawer(visible){
		if(App.instance.state.hideDrawer!==visible){
			await App.instance.setState({
				hideDrawer: visible,
				reloadNumber: App.instance.state.reloadNumber+1,
			});
		}
	}

	static async setUser(user){
		App.instance.setUser(user);
	}

	async setUser(user, callback=() => {}){
		let role = await this.loadRole(user);
		await this.setState({
			reloadNumber: this.state.reloadNumber+1,
			loadedUser: true,
			user: user,
			role: role,
		}, callback)
	}

	static getRole(){
		return App.instance.state?.role;
	}

	static getUser(){
		return App.instance.getUser();
	}

	getUser(){
		return this.state.user;
	}

	async loadUser(){
		try{
			if(ServerAPI.areCredentialsSaved()){
				let directus = ServerAPI.getClient();
				let me = await ServerAPI.getMe(directus);
				return me;
			}
		} catch (err){
			console.log("Error at load User");
			console.log(err);
		}
		return null;
	}

	async componentDidMount() {
		await MyDirectusStorage.init();
		if(!!App.plugin && !!App.plugin.initApp){
			App.plugin.initApp();
		}
		await this.loadServerInfo();
		let user = await this.loadUser();
		await this.setUser(user);
	}

	getBaseTheme(){
		let initialColorMode = this.props.initialColorMode || ColorCodeManager.VALUE_THEME_LIGHT;
		return BaseThemeGenerator.getBaseTheme(initialColorMode);
	}

	render() {

		const theme = this.getBaseTheme();
		let content = <RootStack hideDrawer={this.state.hideDrawer} />
		if(!!this.props.children){
			content = this.props.children;
		}

		if(this.state.reloadNumber===0 || !this.state.loadedUser){
			return null;
		}


		return (
			<NativeBaseProvider reloadNumber={this.state.reloadNumber+""+this.state.hideDrawer} theme={theme} colorModeManager={ColorCodeManager.getManager()} config={nativebaseConfig}>
					<Root key={this.state.reloadNumber+""+this.state.hideDrawer}>{content}</Root>
					<ColorStatusBar />
			</NativeBaseProvider>
		);
	}
}
