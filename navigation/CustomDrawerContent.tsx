import React, {FunctionComponent} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Button, Text, View} from "native-base";
import {ProjectLogo} from "../project/ProjectLogo";
import {NavigatorHelper} from "./NavigatorHelper";
import {ProjectName} from "../project/ProjectName";
import {MyMenuRegisterer} from "./MyMenuRegisterer";
import {MyThemedBox} from "../helper/MyThemedBox";
import {ExpandableDrawerItem} from "./ExpandableDrawerItem";
import App from "../App";
import {UserProfileAvatar} from "../project/UserProfileAvatar";
import ServerAPI from "../ServerAPI";
import {SignOutButton} from "../auth/SignOutButton";
import {Users} from "../screens/user/Users";
import {SafeAreaView} from "react-native";
import {SettingsButton} from "../screens/settings/SettingsButton";

export const CustomDrawerContent: FunctionComponent = (props) => {

	let history = props?.state?.history || [];
	let currentRoute = history.slice(-1)[0]; // get last element
	//console.log("currentRoute: ", currentRoute);
	//console.log("props", props);

	const currentRouteKey = currentRoute?.key;
	let user = App.getUser()

	function renderDrawerItems(){
		let routes = props?.state?.routes || [];
		let output = [];


		if(!!user){
			output.push(renderAuthenticatedMenu())
			output.push(renderUserRoleIdMenu(user));
			output.push(renderUserRoleNameMenu());
		} else {
			output.push(renderUnauthenticatedMenu())
		}
		output.push(renderCommonMenu())

		return output;
	}

	function renderMenu(menu, level=0){
		let menuChilds = menu.getChildItems();
		let hasChildren = menuChilds.length>0;

		let renderedChilds = [];
		for(let childMenu of menuChilds){
			renderedChilds.push(renderMenu(childMenu, level+1));
		}

		let content = menu.content;
		if(!content){
			content = (
				<View >
					<Text fontSize={"md"}>{menu.label}</Text>
				</View>
			)
		}

		return (
				<ExpandableDrawerItem
					expanded={menu.expanded}
					key={"ExpandableDrawerItem"+menu.key}
					hasChildren={hasChildren}
					level={level}
					label={() => {
						return content
					}}
					onPress={(nextExpanded) => {menu.handleOnPress()}}
				>
					{renderedChilds}
				</ExpandableDrawerItem>
		)
	}

	function renderUserRoleNameMenu(){
		let role = App.getRole();
		return renderMenuByName(role?.name);
	}

	function renderUserRoleIdMenu(user){
		let role_id = user.role;
		return renderMenusByRole(role_id);
	}

	function renderUnauthenticatedMenu(){
		return renderMenusByRole(MyMenuRegisterer.ROLE_UNAUTHENTICATED)
	}

	function renderAuthenticatedMenu(){
		return renderMenusByRole(MyMenuRegisterer.ROLE_AUTHENTICATED)
	}

	function renderCommonMenu(){
		return renderMenusByRole(MyMenuRegisterer.ROLE_PUBLIC)
	}

	function renderMenuByName(name){
		let menus = MyMenuRegisterer.menusForRolesByName[name];
		return renderMenus(menus);
	}

	function renderMenusByRole(role){
		let menus = MyMenuRegisterer.menusForRolesByID[role];
		return renderMenus(menus);
	}

	function renderMenus(menus){
		if(!menus) {
			menus = [];
		}
		let output = [];
		for(let menu of menus){
			output.push(renderMenu(menu))
		}
		return output
	}

	function handleAvatarPress(){
		NavigatorHelper.navigate(Users, {id: user.id});
	}

	function renderBottomPanel(){
		if(!!user){
			return (
				<MyThemedBox style={{flexDirection: "row", alignItems: "center"}}>
					<UserProfileAvatar user={user} onPress={handleAvatarPress} />
					<SettingsButton onlyIcon={true} />
					<View style={{flex: 1, flexDirection: "row-reverse"}}>
						<SignOutButton onlyIcon={true} />
					</View>
				</MyThemedBox>
			)
		}
	}

	return (
		<MyThemedBox style={{height: "100%"}}>
			<SafeAreaView style={{height: "100%", width: "100%"}}>
			<DrawerContentScrollView {...props}>
				<DrawerItem
					key={"ProjectLogoItem"}
					label={() => {
						return (<View style={{flexDirection: "row"}} >
							<ProjectLogo menuBar={true} />
							<ProjectName themedColor={true} />
						</View>)
					}}
					onPress={() => {
						NavigatorHelper.navigateHome();
					}}
				/>
				{renderDrawerItems()}
			</DrawerContentScrollView>
			{renderBottomPanel()}
			</SafeAreaView>
		</MyThemedBox>
	);
}
