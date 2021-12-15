import React, {FunctionComponent, useState} from 'react';
import {DrawerContentScrollView} from "@react-navigation/drawer";
import {TouchableOpacity} from "react-native";
import {Icon, View} from "native-base";
import {MyThemedBox} from "../helper/MyThemedBox";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export interface AppState {
    onPress?: (nextExpanded?) => {}
    expanded?: boolean
}
export const ExpandableDrawerItem: FunctionComponent<AppState> = (props) => {

    const handlePress = props.onPress;
    const [expanded, setExpanded] = useState(props.expanded)

    function renderExpandIcon(){
        if(!props.hasChildren){
            return <Icon as={MaterialCommunityIcons} name={"circle-small"}/>;
        }
        if(expanded){
            return <Icon as={MaterialCommunityIcons} name={"chevron-down"}/>
        } else {
            return <Icon as={MaterialCommunityIcons} name={"chevron-right"}/>
        }
    }

    async function handleOnPress(){
        setExpanded(!expanded);
        if(!!handlePress){
            await handlePress(!expanded);
        }
    }

    function renderContent(){
        if(!expanded){
            return null;
        }

        return(
            <View style={{paddingLeft: 15}}>
                <DrawerContentScrollView contentContainerStyle={{paddingTop: 0}}>
                    {props.children}
                </DrawerContentScrollView>
            </View>
        )
    }

    return(
        <View style={{width: "100%"}}>
            <MyThemedBox _shadeLevel={props.level} style={{width: "100%"}} >
                <TouchableOpacity onPress={handleOnPress} style={{padding: 8}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        {renderExpandIcon()}
                        {props.label()}
                    </View>
                </TouchableOpacity>
                {renderContent()}
            </MyThemedBox>
        </View>
    )

}