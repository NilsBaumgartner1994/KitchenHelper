import React, {useEffect, useState} from "react";
import {AlertDialog, Button, Center, Divider, Text} from "native-base";
import TextGenerator from "../../placeholder/TextGenerator";
import App from "../../App";

export const CookieInformation = (props) => {

	function hasCookieConfig(){
		return App.storage.has_cookie_config()
	}

	const [isOpen, setIsOpen] = React.useState(!hasCookieConfig())

	// corresponding componentDidMount
	useEffect(() => {

	}, [])

	function denyCookies(){
		let cookie_config = {necessary: false};
		handleDecision(cookie_config)
	}

	function acceptCookies(){
		let cookie_config = {necessary: true};
		handleDecision(cookie_config)
	}

	function handleDecision(cookie_config){
		App.storage.set_cookie_config(cookie_config);
		setIsOpen(!hasCookieConfig())
	}

	const cancelRef = React.useRef(null)
	return (
			<AlertDialog
				leastDestructiveRef={cancelRef}
				isOpen={isOpen}
				onClose={denyCookies}
			>
				<AlertDialog.Content>
					<AlertDialog.CloseButton />
					<AlertDialog.Header>Deine Privatsphäre</AlertDialog.Header>
					<AlertDialog.Body>
						<Text> </Text>
						<Divider />
						<Text> </Text>
						<Text>Wir verwenden Cookies, um dir ein optimales Webseiten-Erlebnis zu bieten, die Webseite technisch zu betreiben und die Nutzung der Webseite statistisch auszuwerten. Mit „Alle Cookies akzeptieren“ willigst du in die Verwendung von Cookies ein. Weitere Informationen findest du in unserer Datenschutzerklärung.</Text>
					</AlertDialog.Body>
					<AlertDialog.Footer>
						<Button.Group space={2}>
							<Button onPress={acceptCookies}>
								Alle Cookies akzeptieren
							</Button>
						</Button.Group>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog>
	)
}