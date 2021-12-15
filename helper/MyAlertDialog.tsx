import React, {FunctionComponent, useEffect, useState} from "react";
import {AlertDialog, Button, Center, Divider, Text, View} from "native-base";
import TextGenerator from "../../placeholder/TextGenerator";
import App from "../../App";
import {BreakPointLayout} from "../templates/BreakPointLayout";

interface AppState {
	isOpen: boolean;
	onClose: () => {};
	onAccept: () => {};
	title: string;
	content: string;
	accept: string;
}
export const MyAlertDialog : FunctionComponent<AppState> = (props) => {

	const [isOpen, setIsOpen] = React.useState(props.isOpen)

	// corresponding componentDidMount
	useEffect(() => {

	}, [])

	const onClose = async () => {
		let allowAction = true;
		if(props.onClose){
			allowAction = await props.onClose()
		}
		if(allowAction){
			setIsOpen(false)
		}
	}

	const onAccept = async () => {
		let allowAction = true;
		if(props.onAccept){
			allowAction = await props.onAccept()
		}
		if(allowAction){
			setIsOpen(false)
		}
	}

	const cancelRef = React.useRef(null)
	return (
			<AlertDialog
				leastDestructiveRef={cancelRef}
				isOpen={isOpen}
				onClose={onClose}
				size={props.size}
			>
				<BreakPointLayout>
						<AlertDialog.Content>
							<AlertDialog.CloseButton />
							<AlertDialog.Header>{props.title}</AlertDialog.Header>
							<AlertDialog.Body>
								<Text> </Text>
								<Divider />
								<Text> </Text>
								<Text>{props.content}</Text>
							</AlertDialog.Body>
							<AlertDialog.Footer>
								<Button.Group space={2}>
									<Button onPress={onAccept}>
										{props.accept}
									</Button>
								</Button.Group>
							</AlertDialog.Footer>
						</AlertDialog.Content>
				</BreakPointLayout>
			</AlertDialog>
	)
}