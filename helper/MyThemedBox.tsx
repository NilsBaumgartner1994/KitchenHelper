import React, {FunctionComponent} from 'react';
import {Box, useColorModeValue} from "native-base";
import {IBoxProps} from "native-base/lib/typescript/components/primitives/Box/types";

export interface AppState {
	_shadeLevel?: number
	activeOnHover?: boolean
}
export const MyThemedBox: FunctionComponent<AppState & IBoxProps> = (props) => {

	let level = props._shadeLevel || 0;

	const maxLevel = 9;
	const minLevel = 0;
	level = Math.min(maxLevel, Math.max(minLevel, level))

	function getShadeByLevel(level){
		if(level===0) return 50;
		return level*100;
	}

	let themeLevel = useColorModeValue(level, maxLevel-level)
	let _myThemeShade = getShadeByLevel(themeLevel);

	const childrenWithProps = React.Children.map(props.children, child => {
		// Checking isValidElement is the safe way and avoids a typescript
		// error too.
		if (React.isValidElement(child)) {
			// @ts-ignore
			return React.cloneElement(child, { _shadeLevel: level+1 });
		}
		return child;
	});

	return(
		<Box
			 _light={{
				 bg: 'coolGray.'+_myThemeShade,
			 }}
			 _dark={{
				 bg: 'blueGray.'+_myThemeShade,
			 }}
			 {...props}
		>
			{childrenWithProps}
		</Box>
	)

}