import React, {FunctionComponent} from 'react';
import {Button, Text} from "native-base";
import {IButtonProps} from "native-base/src/components/primitives/Button/types";
import {IBoxProps} from "native-base/src/components/primitives/Box/index";
import {TransparentButton} from "./TransparentButton";

export const TransparentTextButton: FunctionComponent<IButtonProps & IBoxProps> = (props) => {

	let content = props.children;

	return (
		<TransparentButton {...props}>
			<Text {...props}>
				{content}
			</Text>
		</TransparentButton>
	)
}