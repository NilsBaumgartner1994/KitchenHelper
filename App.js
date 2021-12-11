import React from 'react';
import {NativeBaseProvider} from 'native-base';
import nativebaseConfig from '../../nativebase.config';
import {Root} from './navigation/RootComponent';
import ColorCodeManager from "./theme/ColorCodeManager";
import BaseThemeGenerator from "./theme";
import {RootStack} from "./navigation/rootNavigator";
import {ColorStatusBar} from "./ColorStatusBar";
import {MyDirectusStorage} from "./storage/MyDirectusStorage";
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import ServerAPI from "./ServerAPI";
import AppHelper from "../hiwis/util/AppHelper";
import {RegisteredRoutesMap} from "./navigation/RegisteredRoutesMap";

export default class App extends React.Component{

	static storage = null;
	static instance = null;

	constructor(props) {
		super(props);
		App.instance = this;
  		App.storage = new MyDirectusStorage();
		this.state = {
			loadedUser: false,
		 	reloadNumber: 0,
			hideDrawer: false,
		}
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
		await AppHelper.initApp();
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
