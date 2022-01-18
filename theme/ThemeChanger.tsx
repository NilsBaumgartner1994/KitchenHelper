import React, {FunctionComponent, useEffect} from "react";
import {useColorMode} from "native-base";
import ColorCodeHelper from "./ColorCodeHelper";
import {useSynchedState} from "../synchedstate/SynchedState";
import {StorageKeys} from "../storage/StorageKeys";
import {TouchableOpacity} from "react-native";

export const ThemeChanger: FunctionComponent<any> = (props) => {

	let storageKey = StorageKeys.THEME;
	const [value, setValue] = useSynchedState(storageKey);
	const { colorMode, toggleColorMode } = useColorMode();
	let nextTheme = colorMode===ColorCodeHelper.VALUE_THEME_LIGHT ? ColorCodeHelper.VALUE_THEME_DARK : ColorCodeHelper.VALUE_THEME_LIGHT;

	// corresponding componentDidMount
	useEffect(() => {

	}, [colorMode])

	return(
		<TouchableOpacity
			onPress={() => {
				setValue(nextTheme)
				toggleColorMode();
			}} >
			{props.children}
		</TouchableOpacity>
	)
}