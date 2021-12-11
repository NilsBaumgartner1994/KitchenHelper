import React, {FunctionComponent} from 'react';
import {View} from "native-base";
import {Skeleton} from "primereact/skeleton";

export const LoadingView: FunctionComponent = (props) => {
	const styles = {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		opacity: 0.7,
		justifyContent: "center",
		alignItems: "center",
	}

	return (
		<View style={styles}>
			<Skeleton height={"100%"} width={"100%"}/>
		</View>
	);
}