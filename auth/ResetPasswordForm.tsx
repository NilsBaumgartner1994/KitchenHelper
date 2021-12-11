import React, {FunctionComponent, useEffect, useState} from 'react';
import {Flex, FormControl, Input, Text, View} from "native-base";
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {Slider} from 'primereact/slider';
import {Login} from "./Login";
import {FormButton} from "../buttons/FormButton";
import {TransparentTextButton} from "../buttons/TransparentTextButton";
import {InternalLink} from "../navigation/InternalLink";

export const ResetPasswordForm: FunctionComponent = (props) => {

	const token=props.token;
	let email = "yourEmail";

	const [resetInitiated, setResetInitiated] = useState(false)
	const [password, setPassword] = useState("")

	// corresponding componentDidMount
	useEffect(() => {

	}, [p])

	function resetPassword(){

	}

	return (
		<View>
			<Text fontSize="4xl" fontWeight={800}>
				{"Reset Password"}
			</Text>
			<FormControl isRequired>
				<View style={{marginVertical: "10px"}}>
					<Input
						isDisabled={true}
						value={email}
						size="lg" />
				</View>
			</FormControl>
			<FormControl isRequired>
				<View style={{marginVertical: "10px"}}>
					<Input
						isDisabled={resetInitiated}
						onChange={(event) => { // @ts-ignore
							setPassword(event.target.value)}}
						type="password"
						value={password}
						placeholder="Password"
						size="lg" />
				</View>
			</FormControl>
			<Flex direction={"row"} justify={"space-between"}>
				<FormButton loading={resetInitiated} disabled={resetInitiated} onPress={() => {resetPassword()}}>
					{"Reset"}
				</FormButton>
				<Slider onChange={(e) => {}} />
				<InternalLink destination={Login}>{"Sign In"}</InternalLink>
			</Flex>
		</View>
	)
}