import {ResetPassword} from "../auth/ResetPassword";
import {Home} from "../screens/home/Home";
import {RegisteredRoutesMap} from "./RegisteredRoutesMap";
import {Login} from "../auth/Login";
import {PrivacyPolicy} from "../screens/legalRequirements/PrivacyPolicy";
import {AboutUs} from "../screens/legalRequirements/AboutUs";
import {License} from "../screens/legalRequirements/License";
import {TermsAndConditions} from "../screens/legalRequirements/TermsAndConditions";
import {BaseTemplate} from "../templates/BaseTemplate";
import {LoginTemplate} from "../templates/LoginTemplate";
import React from "react";
import {MyMenuRegisterer} from "./MyMenuRegisterer";
import {MenuItem} from "./MenuItem";
import {Users} from "../screens/user/Users";
import App from "../App";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Settings} from "../screens/settings/Settings";
import {DeveloperSettings} from "../screens/settings/DeveloperSettings";

const Drawer = createDrawerNavigator();

export class RouteRegisterer {

    static screens = null;

    static HOME_AUTHENTICATED = Home;
    static HOME_UNAUTHENTICATED = Login;

    // this is here since we also get the drawer from here, if you have a better place for this feel free to move it
    private static drawerBorderColor: string | null = null;
    private static drawerBackgroundColor: string | null = null;

    static registerLegalRequirements(){
        // Legal Requirements
        RegisteredRoutesMap.registerRoute(AboutUs, BaseTemplate, "About us", "about-us");
        RegisteredRoutesMap.registerRoute(License, BaseTemplate, "License", "license");
        RegisteredRoutesMap.registerRoute(PrivacyPolicy, BaseTemplate, "Privacy Policy", "privacy-policy");
        RegisteredRoutesMap.registerRoute(TermsAndConditions, BaseTemplate, "Terms and Conditions", "terms-and-conditions");

        let legalRequirements = new MenuItem("LegalRequirements", "Legal Requirements", null);
        legalRequirements.addChildsFromFunctionComponents(AboutUs, License, PrivacyPolicy, TermsAndConditions);
        MyMenuRegisterer.registerCommonMenu(legalRequirements);
    }

    static register(){
        RegisteredRoutesMap.reset();
        RegisteredRoutesMap.setInitialRouteName("login");

        RouteRegisterer.registerLegalRequirements();

        RegisteredRoutesMap.registerRoute(Login, LoginTemplate, "Login", "login");
        RegisteredRoutesMap.registerRoute(ResetPassword, LoginTemplate, "Reset Password", "reset-password");
        MyMenuRegisterer.registerUnauthenticatedMenu(MenuItem.getMenuItemFromComponent(Login));

        RegisteredRoutesMap.registerRoute(Home, BaseTemplate, "Home", "home");

        RegisteredRoutesMap.registerRoute(Users, BaseTemplate, "Users", "users", "/:id?");
        RegisteredRoutesMap.registerRoute(Settings, BaseTemplate, "Settings", "settings", "/:id?");
        RegisteredRoutesMap.registerRoute(DeveloperSettings, BaseTemplate, "Developer Settings", "settings/developer", "/:id?");

        if(!!App.plugin && App.plugin.registerRoutes()){
            App.plugin.registerRoutes();
        }
    }

    static getDrawer(){
        return Drawer;
    }

    static setDrawerBorderColor(color: string) {
        RouteRegisterer.drawerBorderColor = color;
    }

    static getDrawerBorderColor(): string {
        return RouteRegisterer.drawerBorderColor;
    }

    static setDrawerBackgroundColor(color: string) {
        RouteRegisterer.drawerBackgroundColor = color;
    }

    static getDrawerBackgroundColor(): string {
        return RouteRegisterer.drawerBackgroundColor;
    }

    static loadDrawerScreens(){
        RouteRegisterer.screens = RouteRegisterer.getDrawerScreens();
    }

    static getDrawerScreens(){
        let output = [];

        let routes = RegisteredRoutesMap.getRouteList();
        for(let route of routes){
            let routeConfig = RegisteredRoutesMap.getConfigForRoute(route);
            let screenName = routeConfig.screenName;
            let component = routeConfig.component;
            let template = routeConfig.template;
            let title = routeConfig.title;
            let key="RootStack:"+screenName;

            let content = (props) => {
                return React.createElement(component, props)
            };
            if(!!template){
                content = (props) => {
                    let customProps = {title: title};
                    let renderedComponent = React.createElement(component, {...props, ...customProps})
                    return React.createElement(template, {...props, ...customProps, children: renderedComponent})
                };
            }

            output.push(
                <Drawer.Screen
                    key={key}
                    name={screenName}
                    component={content}
                    options={{
                        title: title,
                        headerLeft: null,
                    }}
                />
            )
        }
        return output;
    }

}
