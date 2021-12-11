import {Transport, TransportMethods, TransportOptions, TransportResponse} from "@directus/sdk";
import {NavigatorHelper} from "./navigation/NavigatorHelper";
import {Login} from "./auth/Login";
import ServerAPI from "./ServerAPI";
import App from "./App";

export default class TransportWrapper extends Transport{
	customErrorHandleCallback = null;

	protected async request<T = any, R = any>(
		method: TransportMethods,
		path: string,
		data?: Record<string, any>,
		options?: Omit<TransportOptions, 'url'>
	): Promise<TransportResponse<T, R>> {
		try {
			return await super.request(method, path, data, options);
		} catch (error: any) {
			if (!error || error instanceof Error === false) {
				throw error;
			}

			const status = error.response?.status;
			const code = error.errors?.[0]?.extensions?.code;

			if (
				status === 401 &&
				code === 'INVALID_CREDENTIALS'
				/**
				&&
				error.request.responseURL.includes('refresh') === false &&
				error.request.responseURL.includes('login') === false &&
				error.request.responseURL.includes('tfa') === false
				 */
			) {
				//console.log("INVALID_CREDENTIALS");
				if(!!this.customErrorHandleCallback){
					await this.customErrorHandleCallback(error);
				} else {
					let newToken = null;

					try {
						//console.log("Try to refresh");
						let directus = ServerAPI.getDirectus(App.storage, ServerAPI.handleLogoutError);
						newToken = await directus.auth.refresh();
					} catch {
						//console.log("Refresh did not worked...");
						await ServerAPI.handleLogout();
						return Promise.reject();
					}

					if (newToken) {
						//console.log("Nice refresh worked, but wha now?");
						return Promise.reject(error);
					}
				}
			}

			//console.log("No idea what error caused neither what to do");
			return Promise.reject(error);
		}
	}

}
