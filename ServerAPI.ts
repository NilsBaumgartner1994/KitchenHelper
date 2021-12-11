import EnviromentHelper from "./EnviromentHelper";
import {Auth, AuthMode, Directus, MemoryStorage, ServerInfo, Transport, UserItem} from "@directus/sdk";
import App from "./App";
import axios from "axios";
import {NavigatorHelper} from "./navigation/NavigatorHelper";
import {Login} from "./auth/Login";
import TransportWrapper from "./TransportWrapper";

export default class ServerAPI{

	static directus = null;
	static tempStore = {
		serverInfo: undefined
	};

	/**
	 * We want a public client to get dont interfere with broken permissions and other stuff
	 */
	static getPublicClient(){
		let storage = new MemoryStorage();
		return ServerAPI.getDirectus(storage);
		//return ServerAPI.getClient(); //maybe we can fix the normal client so that bugs do not show up at logout
	}

	static getDirectus(storage, customErrorHandleCallback=null){
		let url = EnviromentHelper.getBackendURL();
		let transport = ServerAPI.getTransport(url, storage, customErrorHandleCallback);
		let auth = ServerAPI.getAuth(url, storage, customErrorHandleCallback)
		return new Directus(url, {transport: transport, storage: storage, auth: auth});
	}

	static areCredentialsSaved(){
		return App.storage.has_credentials_saved();
	}

	static async handleLogoutError(){
		let storage = App.storage;
		storage.clear_credentials();
	}

	static async handleLogout(){
		try{
			let directus = ServerAPI.getDirectus(App.storage, ServerAPI.handleLogoutError);
			let response = await directus.auth.logout();
			await ServerAPI.handleLogoutError(); // we better make sure to reset variables in storage
			NavigatorHelper.navigate(Login, null, true);
			await App.setUser(null);
		} catch (err){
			console.log(err);
			NavigatorHelper.navigate(Login, null, true);
			await App.setUser(null);
		}
	}

	static getClient(): Directus<any>{
		if(ServerAPI.directus){
			return ServerAPI.directus;
		}
		const directus = ServerAPI.getDirectus(App.storage);
		// api.interceptors.response.use(onResponse, onError);

		ServerAPI.directus = directus;
		return directus;
	}

	static async getRole(user){
		let role_id = user?.role;
		if(!!role_id){
			try{
				let directus = ServerAPI.getClient();
				let role = await directus.roles.readOne(role_id);
				return role;
			} catch (err){
				console.log("Error at get Server Info: ",err);
			}
		}
	}

	static async loginWithAccessDirectusAccessToken(directus_access_token){
		let data = await ServerAPI.refreshWithDirectusToken(directus_access_token);
		let storage = App.storage;
		let access_token = data.access_token;
		let refresh_token = data.refresh_token;
		storage.set_refresh_token(refresh_token);
		storage.set_access_token(access_token);
		return ServerAPI.getClient();
	}

	private static getAuth(url, storage, customErrorHandleCallback=null){
		let transport = ServerAPI.getTransport(url, storage, customErrorHandleCallback);
		const modeForAuth: AuthMode = "json";
		//const modeForAuth: AuthMode = "cookie";
		let auth = new Auth({
			transport: transport,
			storage: storage,
			autoRefresh: true,
			mode: modeForAuth
		});
		return auth;
	}

	static getAuthorizationHeader(storage = App.storage){
		const token = storage.auth_token;
		const bearer = token
			? token.startsWith(`Bearer `)
				? String(storage.auth_token)
				: `Bearer ${storage.auth_token}`
			: '';
		return {
			Authorization: bearer
		}
	}

	private static getTransport(url, storage, customErrorHandleCallback=null){
		let myTransport = new TransportWrapper({
			url: url,
			beforeRequest: (config) => {
				const token = storage.auth_token;
				const bearer = token
					? token.startsWith(`Bearer `)
						? String(storage.auth_token)
						: `Bearer ${storage.auth_token}`
					: '';

				return {
					...config,
					headers: {
						Authorization: bearer,
						...config.headers,
					},
				};
			}
		});
		myTransport.customErrorHandleCallback = customErrorHandleCallback;
		return myTransport;
	}

	static getAPIUrl(){
		let directus = ServerAPI.getPublicClient();
		// @ts-ignore
		return directus.transport.url;
	}

	static async getServerInfo(): Promise<ServerInfo>{
		try{
			let directus = ServerAPI.getPublicClient();
			//TODO we could add caching here
			let serverInfo = await directus.server.info();
			ServerAPI.tempStore.serverInfo = serverInfo;
			return serverInfo;
		} catch (err){
			console.log("ServerAPI.getServerInfo()");
			console.log(err);
		}
		return null;
	}

	static getAssetImageURL(imageID: string){
		return EnviromentHelper.getAssetURL(imageID);
	}

	static async getAuthProviders(): Promise<any>{
		let getProvidersURL = ServerAPI.getAPIUrl()+"/auth";
		try{
			let answer = await axios.get(getProvidersURL);
			let providers = answer?.data?.data;
			return providers
		} catch (err){
			console.log(err)
		}
		return null;
	}

	static async getMe(directus=null): Promise<UserItem>{
		if(!directus){
			directus = ServerAPI.getClient();
		}
		return directus.users.me.read();
	}

	static async isRefreshTokenSaved(){
		let token = App.storage.auth_refresh_token;
		return !!token;
	}

	static async refreshWithDirectusToken(directus_access_token: string){
		let url = EnviromentHelper.getBackendURL()+'/auth/refresh';
		const api = axios.create();
		try{
			let response = await api.post(url, {"refresh_token": directus_access_token}, {});
			const refresh_token = response.data.data.refresh_token;
			App.storage.set_refresh_token(refresh_token);
			return response.data.data;
		} catch (err){
			console.log(err);
		}
		return null;
	}
}
