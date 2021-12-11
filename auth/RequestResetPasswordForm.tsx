import React, {FunctionComponent, useEffect, useState} from 'react';
import {Flex, FormControl, Input, Text, View} from "native-base";
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {Login} from "./Login";
import {FormButton} from "../buttons/FormButton";
import ServerAPI from "../ServerAPI";
import {URL_Helper} from "../helper/URL_Helper";
import {TransparentTextButton} from "../buttons/TransparentTextButton";
import {AboutUs} from "../screens/legalRequirements/AboutUs";
import {InternalLink} from "../navigation/InternalLink";

export const RequestResetPasswordForm: FunctionComponent = (props) => {

	const [email, setEmail] = useState("")
	const [validEmail, setValidEmail] = useState(undefined)
	const [resetInitiated, setResetInitiated] = useState(false)

	// corresponding componentDidMount
	useEffect(() => {

	}, [])

	async function requestPasswordReset(){
		console.log("requestPasswordReset");
		if(!resetInitiated){
			await setResetInitiated(true);
			try{
				console.log("Send reset request");
				let directus = ServerAPI.getPublicClient();
				let url = URL_Helper.getCurrentLocationWithoutQueryParams();
				url = "https://localhost:19006/myapp/app/reset-password";
				console.log(url);
				console.log(email);
				let answer = await directus.auth.password.request(
					email,
					url // In this case, the link will be https://myapp.com?token=FEE0A...
				);
				console.log(answer);
			} catch (err){
				console.log(err);
			} finally {
				await setResetInitiated(false);
			}
		}
	}

	return (
		<View>
			<Text fontSize="4xl" fontWeight={800}>
				{"Reset Password"}
			</Text>
			<FormControl isRequired>
				<View style={{marginVertical: "10px"}}>
					<Input
						onChange={(event) => { // @ts-ignore
							setEmail(event.target.value)}}
						type="email"
						value={email}
						placeholder="Email"
						size="lg" />
				</View>
			</FormControl>
			<Flex direction={"row"} justify={"space-between"}>
				<FormButton disabled={resetInitiated} onPress={() => {requestPasswordReset()}}>
					{"Reset"}
				</FormButton>
				<InternalLink destination={Login}>{"Sign In"}</InternalLink>
			</Flex>
		</View>
	)
}