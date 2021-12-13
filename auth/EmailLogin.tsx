import React, {FunctionComponent, useEffect, useState} from 'react';
import ServerAPI from "../ServerAPI";
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {Login} from "./Login";
import EnviromentHelper from "../EnviromentHelper";
import {Flex, FormControl, Input, View} from "native-base";
import {InternalLink} from "../navigation/InternalLink";
import {ResetPassword} from "./ResetPassword";
import {FormButton} from "../buttons/FormButton";

const showResetPassword = false;
const showEmailLogin = true;

export interface WebViewLoginFormState {

}
export const EmailLogin: FunctionComponent<WebViewLoginFormState> = (props) => {

	const markerRef = React.createRef();

	const [reloadnumber, setReloadnumber] = useState(0)
	const [loginInitiated, setLoginInitiated] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	async function handleLoginWithEmail(){
		await setLoginInitiated(true);
		try{
			let directus = ServerAPI.getPublicClient();
			console.log("handleLoginWithEmail")
			console.log("email: ", email)
			console.log("password: ", password)
			let response = await directus.auth.login({
				email: email, //'admin@example.com',
				password: password //'d1r3ctu5',
			});
			let token = response.refresh_token;
			console.log("Ok got token: ");
			console.log(token);
			NavigatorHelper.navigate(Login, {[EnviromentHelper.getDirectusAccessTokenName()]: token} )
		} catch (err){
			console.log(err);
		} finally {
			//setLoginInitiated(false);
		}
	}

	// corresponding componentDidMount
	useEffect(() => {

	}, [])

	function renderInvisibleForm(){
		let output = [];
		output.push(<input className='form-control' name={"email"} value={email}/>)
		output.push(<input className='form-control' name={"password"} value={password}/>)
		return(
			<div key={reloadnumber} style={{display: "none"}}>
				<form ref={markerRef} action={"/"} method="post">
					{output}
					<input type='submit' className='btn btn-success'/>
				</form>
			</div>
		)
	}

	function renderResetPasswordButton(){
		if(showResetPassword){
			return (
				<InternalLink destination={ResetPassword}>{"Forgot Password"}</InternalLink>
			)
		}
		return null;
	}

	function renderEmailLogin(){
		if(showEmailLogin){
			return(
				<>
					<FormControl isRequired>
						<View style={{marginVertical: 10}}>
							<Input
								isDisabled={loginInitiated}
								nativeID={"username"}
								type={"email"}
								//TODO extract the on change method to an extra class to call the callback
								onChange={async (event) => { // @ts-ignore
									setEmail(event.nativeEvent.text)
								}}
								placeholder="Email" size="lg" />
						</View>
					</FormControl>
					<FormControl isRequired>
						<View style={{marginVertical: 10}} >
							<Input
								isDisabled={loginInitiated}
								nativeID={"password"}
								type={"password"}
								onChange={(event) => { // @ts-ignore
									setPassword(event.nativeEvent.text)
								}} placeholder="Password" size="lg" />
						</View>
					</FormControl>
					<Flex direction={"row"} justify={"space-between"} >
						<FormButton loading={loginInitiated} disabled={loginInitiated} onPress={() => {handleLoginWithEmail()}}>
							{"Sign In"}
						</FormButton>
						{renderResetPasswordButton()}
					</Flex>
				</>
			)
		}
		return null;
	}

	return (renderEmailLogin())
}