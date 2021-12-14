import React, {useEffect, useState} from "react";
import {Layout} from "./Layout";
import {ScrollViewWithGradient} from "../ScrollViewWithGradient";
import ServerAPI from "../ServerAPI";
import {Box, View} from "native-base";
import {BreakPointLayout} from "./BreakPointLayout";
import ShowMoreGradientPlaceholder from "../ShowMoreGradientPlaceholder";
import {CookieInformation} from "../screens/legalRequirements/CookieInformation";
import {SafeAreaView} from "react-native";

export const BaseTemplate = ({
								 children,
								 navigation,
								 title,
								 navigateTo,
								 serverInfo,
								 _status,
								 _hStack,
								 ...props}: any) => {

	const [reloadnumber, setReloadnumber] = useState(0)
	const [remoteServerInfo, setServerInfo] = useState(undefined)

	async function loadServerInfo() {
		try{
			let serverInfoRemote = await ServerAPI.getServerInfo();
			setServerInfo(serverInfoRemote);
			setReloadnumber(reloadnumber+1);
		} catch (err){
			console.log("Error at get Server Info");
			console.log(err);
		}
	}

	// corresponding componentDidMount
	useEffect(() => {
		if(!serverInfo){
			loadServerInfo();
		}
	}, [props.route.params])

	return(
		<SafeAreaView style={{height: "100%", width: "100%"}}>
		<View flex={1} flexDirection={"row"}>
		<Layout title={title} serverInfo={serverInfo} >
			<ScrollViewWithGradient hideGradient={true} style={{width: "100%", height: "100%"}} >
				<BreakPointLayout >
					<Box style={{height: "100%", alignItems: "flex-start", width: "100%"}}>
						{children}
						<ShowMoreGradientPlaceholder />
					</Box>
				</BreakPointLayout>
			</ScrollViewWithGradient>
		</Layout>
		<CookieInformation />
		</View>
		</SafeAreaView>
	)
}
