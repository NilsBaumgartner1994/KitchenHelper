import React, {FunctionComponent} from 'react';
import {RegisteredRoutesMap} from "./RegisteredRoutesMap";
import {NavigatorHelper} from "./NavigatorHelper";
import {Text, View} from "native-base";

export class MenuItem{
    key: string;
    label: string;
    content: FunctionComponent;
    command: any;
    items: [MenuItem];
    expanded?: boolean

    constructor(key, label, destination=null, items=null, command=null, content=null, expanded=false) {
        if(!items){
            items=[];
        }

        this.key = key;
        this.label = label;
        this.items = items;
        this.content = content;
        this.command = command;
        this.expanded = expanded;

        if(!command && !!destination){
            this.command = () => {NavigatorHelper.navigateWithoutParams(destination)};
        }
    }

    getChildItems(){
        return this.items;
    }

    handleOnPress(){
        if(!!this.command){
            this.command();
        }
    }

    static getMenuItemFromComponent(component: FunctionComponent){
        let config = RegisteredRoutesMap.getConfigForComponent(component);
        return new MenuItem(config.route, config.title, component, null);
    }

    addChildsFromFunctionComponents(...components){
        for(let component of components){
            let subItem = MenuItem.getMenuItemFromComponent(component);
            this.addChildMenuItems(subItem);
        }
    }

    addChildMenuItems(...items){
        for(let item of items){
            this.items.push(item);
        }
    }

}