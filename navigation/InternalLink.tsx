import React, {FunctionComponent} from 'react';
import {Text} from "native-base";
import {IButtonProps} from "native-base/src/components/primitives/Button/types";
import {IBoxProps} from "native-base/src/components/primitives/Box/index";
import {TransparentButton} from "../buttons/TransparentButton";
import {NavigatorHelper} from "./NavigatorHelper";

interface AppState {
	destination: FunctionComponent;
	fontSize?: string;
	beforeNavigateCallback?: () => {}
	afterNavigateCallback?: () => {}
}
export const InternalLink: FunctionComponent<IButtonProps & IBoxProps & AppState> = (props) => {

	let content = props.children;
	let beforeNavigateCallback = props.beforeNavigateCallback;
	let afterNavigateCallback = props.afterNavigateCallback;

	return (
		<TransparentButton onPress={async () => {
			if(!!beforeNavigateCallback){
				await beforeNavigateCallback();
			}
			NavigatorHelper.navigateWithoutParams(props.destination)
			if(!!afterNavigateCallback){
				await afterNavigateCallback();
			}
		}} {...props}>
			<Text {...props} fontSize={props.fontSize}>
				{content}
			</Text>
		</TransparentButton>
	)
}