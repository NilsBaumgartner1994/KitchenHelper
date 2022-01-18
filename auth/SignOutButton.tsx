import React, {FunctionComponent, useState} from 'react';
import ServerAPI from "../ServerAPI";
import {AlertDialog, Button, Divider, Icon, Text} from "native-base";
import {TransparentTextButton} from "../buttons/TransparentTextButton";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export interface AppState {
	onlyIcon?: boolean;
	transparent?: boolean;
}
export const SignOutButton: (props) => JSX.Element[] = (props) => {

	const cancelRef = React.useRef(null)
	const [isOpen, setIsOpen] = useState(false)

	async function handleLogout(){
		await setIsOpen(false);
		try{
			await ServerAPI.handleLogout();
		} catch (err){
			console.log(err);
		}
	}

	function openConfirmBox(){
		setIsOpen(true);
	}

	function renderAlertBox(){
		return (
			<AlertDialog
				key={"SignOutAlertBox"}
				leastDestructiveRef={cancelRef}
				style={{maxWidth: 600, alignSelf: "center"}}
				isOpen={isOpen}
				onClose={() => {setIsOpen(false)}}
			>
				<AlertDialog.Content>
					<AlertDialog.CloseButton />
					<AlertDialog.Header>Abmelden</AlertDialog.Header>
					<AlertDialog.Body>
						<Text key={"a"}> </Text>
						<Divider />
						<Text key={"b"}> </Text>
						<Text key={"c"}>Sind Sie sicher, dass Sie sich abmelden möchten?</Text>
					</AlertDialog.Body>
					<AlertDialog.Footer>
						<Button.Group space={2}>
							<Button onPress={handleLogout}>
								Abmelden
							</Button>
						</Button.Group>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog>
		)
	}

	function renderOnlyIcon(){
		return (
			<Button key={"LogoutIcon"} style={{backgroundColor: "transparent"}} onPress={openConfirmBox} >
				<Icon as={MaterialCommunityIcons} name={"logout"}/>
			</Button>
		)
	}

	function renderLogoutText(){
		return(
			<TransparentTextButton key={"logoutTextButton"} onPress={openConfirmBox}>
				<Text>{"Sign Out"}</Text>
			</TransparentTextButton>
		)
	}



	let content = [renderAlertBox()];
	if(props.onlyIcon){
		content.push(renderOnlyIcon());
	} else {
		content.push(renderLogoutText());
	}

	return content
}