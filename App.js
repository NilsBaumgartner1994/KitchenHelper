import React from 'react';
import {NativeBaseProvider} from 'native-base';
import nativebaseConfig from '../../nativebase.config';
import {Root} from './navigation/RootComponent';
import ColorCodeHelper from "./theme/ColorCodeHelper";
import BaseThemeGenerator from "./theme";
import {RootStack} from "./navigation/rootNavigator";
import {ColorStatusBar} from "./ColorStatusBar";
import {MyDirectusStorage} from "./storage/MyDirectusStorage";
import ServerAPI from "./ServerAPI";
import {RouteRegisterer} from "./navigation/RouteRegisterer";
import Project from "../project/Project";
import {Linking} from "react-native";
import * as ExpoLinking from "expo-linking";
import {URL_Helper} from "./helper/URL_Helper";
import {NavigatorHelper} from "./navigation/NavigatorHelper";
import LogIgnorer from "./helper/LogIgnorer";
import UserHelper from "./utils/UserHelper";
import {StoreProvider} from "easy-peasy";
import SynchedState from "./synchedstate/SynchedState";

LogIgnorer.ignoreLogs();

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
			user: undefined,
			loadedUser: false,
		 	reloadNumber: 0,
			hideDrawer: false,
		}
	}


// Custom function to subscribe to incoming links
	subscribe(listener) {
		// First, you may want to do the default deep link handling
		const onReceiveURL = ({url}) => {
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
		if(!!user){
			user.isGuest = UserHelper.isGuest(user);
		}
		App.instance.setUser(user);
	}

	static async setUserAsGuest(){
		App.storage.set_is_guest(true);
		await App.setUser(UserHelper.getGuestUser());
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

	static async loadUser(){
		try{
			if(ServerAPI.areCredentialsSaved()){
				let directus = ServerAPI.getClient();
				let me = await ServerAPI.getMe(directus);
				return me;
			} else if(App.storage.is_guest()){
				return UserHelper.getGuestUser();
			}
		} catch (err){
			console.log("Error at load User");
			console.log(err);
		}
		return null;
	}

	async loadSynchedVariables(){
		await MyDirectusStorage.init();
		await App.storage.initContextStores(); //before SynchedState.initContextStores() and after MyDirectusStorage.init();
		if(!!await App.plugin.initContextStores){
			await App.plugin.initContextStores();
		}
		await SynchedState.initContextStores(); //after App.storage.initContextStores()
	}

	async componentDidMount() {
		await this.loadSynchedVariables();
		if(!!App.plugin && !!App.plugin.initApp){
			App.plugin.initApp();
		}
		await this.loadServerInfo();
		let user = await App.loadUser()
		await this.setUser(user);
	}

	getBaseTheme(){
		let initialColorMode = this.props.initialColorMode || ColorCodeHelper.VALUE_THEME_LIGHT;
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
			<StoreProvider store={SynchedState.getContextStore()}>
				<NativeBaseProvider reloadNumber={this.state.reloadNumber+""+this.state.hideDrawer} theme={theme} colorModeManager={ColorCodeHelper.getManager()} config={nativebaseConfig}>
					<Root key={this.state.reloadNumber+""+this.state.hideDrawer}>{content}</Root>
					<ColorStatusBar />
				</NativeBaseProvider>
			</StoreProvider>
		);
	}
}
