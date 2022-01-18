import React, {FunctionComponent, useEffect} from "react";
import {CloneChildrenWithProps} from "../helper/CloneChildrenWithProps";
import {useSynchedState} from "../synchedstate/SynchedState";

export interface AppState {
	storageKey: string;
}
export const SynchedVariable: FunctionComponent<AppState> = (props) => {
	let storageKey = props.storageKey;
	const [value, setValue] = useSynchedState(storageKey);

	// corresponding componentDidMount
	useEffect(() => {

	}, [value])

	const childrenWithProps = CloneChildrenWithProps.passProps(props.children, {storageKey: storageKey, value: value, setValue: setValue})

	return(
		<>
			{childrenWithProps}
		</>
	)
}