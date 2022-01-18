import type {StorageManager} from 'native-base';
import {ColorMode} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appearance} from "react-native";
import {StorageKeys} from "../storage/StorageKeys";
import React, {FunctionComponent, useEffect} from "react";
import {useSynchedState} from "../synchedstate/SynchedState";
import {CloneChildrenWithProps} from "../helper/CloneChildrenWithProps";
import {AppState} from "../storage/SynchedVariable";

//TODO dont save it directly into storage, use synched storage variable
export default class ColorCodeHelper {
	static VALUE_THEME_DARK: ColorMode = 'dark';
	static VALUE_THEME_LIGHT: ColorMode = 'light';
	static VALUE_THEME_DEFAULT: ColorMode = ColorCodeHelper.VALUE_THEME_LIGHT;

	static getSystemPreferedColor(){
		const colorScheme = Appearance.getColorScheme();
		if (colorScheme === 'dark') {
			// Use dark color scheme
			return ColorCodeHelper.VALUE_THEME_DARK
		}
		return ColorCodeHelper.VALUE_THEME_LIGHT;
	}

	static async getColorModeFromStorage(): Promise<ColorMode>{
		try {
			let val = await AsyncStorage.getItem(StorageKeys.THEME);
			if(!val){
				return ColorCodeHelper.getSystemPreferedColor();
			}
			return val === ColorCodeHelper.VALUE_THEME_DARK ? ColorCodeHelper.VALUE_THEME_DARK : ColorCodeHelper.VALUE_THEME_LIGHT;
		} catch (e) {
			console.log(e);
			return ColorCodeHelper.VALUE_THEME_DEFAULT;
		}
	}

	static async setColorModeToStorage(value: ColorMode){
		try {
			await AsyncStorage.setItem(StorageKeys.THEME, value);
		} catch (e) {
			console.log(e);
		}
	}

	static getManager(): StorageManager{
		return {
			get: async () => {
				return await ColorCodeHelper.getColorModeFromStorage();
			},
			set: async (value: ColorMode) => {
				await ColorCodeHelper.setColorModeToStorage(value);
			},
		};
	}
}