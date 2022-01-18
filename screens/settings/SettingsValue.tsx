import React, {FunctionComponent, useEffect, useState} from "react";
import {Button, Icon, Input, Pressable, Text, TextArea, View} from "native-base";
import {useStoreActions, useStoreState} from "easy-peasy";
import {MyThemedBox} from "../../helper/MyThemedBox";
import App from "../../App";
import {CloneChildrenWithProps} from "../../helper/CloneChildrenWithProps";

export interface AppState {
	storageKey?: any;
	value?: any;
	setValue?: any;
}
export const SettingsValue: FunctionComponent<AppState> = (props) => {

	const [text, setText] = React.useState(props.value)

	// corresponding componentDidMount
	useEffect(() => {

	}, [])

	const handleChange = (event: any) => setText(event.target.value)

	return(
		<>
			<MyThemedBox style={{margin: 5, padding: 5}} _shadeLevel={2} >
				<Text>{props.storageKey}</Text>
				<Input
					value={text}
					w={"100%"}
					onChange={handleChange}
					placeholder="Value Controlled Input"
				/>
				<Button onPress={() => {
					props.setValue(text);
				}} >{"Change"}</Button>
			</MyThemedBox>
		</>
	)
}