import React, {FunctionComponent} from 'react';
import {Button, Text} from "native-base";
import {IButtonProps} from "native-base/src/components/primitives/Button/types";
import {IBoxProps} from "native-base/src/components/primitives/Box/index";

export const TransparentButton: FunctionComponent<IButtonProps & IBoxProps> = (props) => {

	let content = props.children;

	return (
		<Button minWidth={154} bgColor={"#00000000"} {...props}>
			{content}
		</Button>
	)
}