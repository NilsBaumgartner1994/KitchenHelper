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
import {
    AdministrationGroupsWrapper,
    AdministrationGroupWrapper,
    ArchiveWrapper,
    ContractsWrapper,
    ContractWrapper,
    CreateAdministrationGroupWrapper,
    CreateContractWrapper,
    CreateDepartmentWrapper,
    CreateUserWrapper,
    DepartmentsWrapper,
    OverviewWrapper, TimeSheetWrapper,
    UsersWrapper
} from "../../hiwis/components/helper/Wrappers";
import {Menu} from "primereact/menu";
import {Users} from "../screens/user/Users";
import {HiWiSTemplate} from "../../hiwis/components/helper/HiWiSTemplate";

export class RouteRegisterer {

    static HOME_AUTHENTICATED = Home;
    static HOME_UNAUTHENTICATED = Login;

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
        RegisteredRoutesMap.setInitialRoute(Login);

        RouteRegisterer.registerLegalRequirements();

        RegisteredRoutesMap.registerRoute(Login, LoginTemplate, "Login", "login");
        RegisteredRoutesMap.registerRoute(ResetPassword, LoginTemplate, "Reset Password", "reset-password");
        MyMenuRegisterer.registerUnauthenticatedMenu(MenuItem.getMenuItemFromComponent(Login));

        RegisteredRoutesMap.registerRoute(Home, BaseTemplate, "Home", "home");

        RegisteredRoutesMap.registerRoute(Users, BaseTemplate, "Users", "users", "/:id?");

        //////////////////////////////////////////////////
        // HiWiS Routes and Components
        //////////////////////////////////////////////////

        // General
        RegisteredRoutesMap.registerRoute(OverviewWrapper, HiWiSTemplate, "Übersicht", "overview");
        RegisteredRoutesMap.registerRoute(ArchiveWrapper, HiWiSTemplate, "Archiv", "archive");

        // Resource creation
        RegisteredRoutesMap.registerRoute(CreateContractWrapper, HiWiSTemplate, "Neuer Vertrag", "createContract");
        RegisteredRoutesMap.registerRoute(CreateAdministrationGroupWrapper, HiWiSTemplate, "Neue Verwaltungsgruppe", "createAdministrationGroup");
        RegisteredRoutesMap.registerRoute(CreateDepartmentWrapper, HiWiSTemplate, "Neuer Fachbereich", "createDepartment");
        RegisteredRoutesMap.registerRoute(CreateUserWrapper, HiWiSTemplate, "Neuer Nutzer", "createUser");

        // Resource overview
        RegisteredRoutesMap.registerRoute(DepartmentsWrapper, HiWiSTemplate, "Fachbereiche", "department");
        RegisteredRoutesMap.registerRoute(UsersWrapper, HiWiSTemplate, "Nutzer", "user");
        RegisteredRoutesMap.registerRoute(ContractsWrapper, HiWiSTemplate, "Verträge", "contract");
        RegisteredRoutesMap.registerRoute(AdministrationGroupsWrapper, HiWiSTemplate, "Verwaltungsgruppen", "administrationgroup");


        // Resource detail
        RegisteredRoutesMap.registerRoute(AdministrationGroupWrapper, HiWiSTemplate, "Verwaltungsgruppe", "administrationgroups");
        // https://reactnavigation.org/docs/configuring-links/#marking-params-as-optional
        RegisteredRoutesMap.registerRoute(ContractWrapper, HiWiSTemplate, "Vertrag", "contracts/:id");
        RegisteredRoutesMap.registerRoute(TimeSheetWrapper, HiWiSTemplate, "Stundenzettel", "timesheets");

        // Side Menu

        // Side Menu for User
        let userMenu = new MenuItem("Contract", "Verträge", null, null, null, null, true);
        MyMenuRegisterer.registerAuthenticatedMenu(userMenu);

            let timeSheetMenuItem = new MenuItem("contract", "Übersicht", ContractsWrapper);
            userMenu.addChildMenuItems(timeSheetMenuItem);

        // Side Menu for Admins
        let adminMenu = new MenuItem("Sekretariat", "Sekretariat", null, null, null, null, true);
        MyMenuRegisterer.registerUnsafeMenuForRoleByName("Admin", adminMenu);

            let menuOverview = new MenuItem("overview", "Übersicht", OverviewWrapper);
            adminMenu.addChildMenuItems(menuOverview)

            let menuArchive = new MenuItem("archive", "Archiv", ArchiveWrapper);
            adminMenu.addChildMenuItems(menuArchive)

            let menuVerwaltung = new MenuItem("verwaltung", "Verwaltung", null, null, null, null, true);
            adminMenu.addChildMenuItems(menuVerwaltung)
                menuVerwaltung.addChildMenuItems(new MenuItem("fachbereiche", "Fachbereiche", DepartmentsWrapper));
                menuVerwaltung.addChildMenuItems(new MenuItem("users", "Nutzer", UsersWrapper));
                menuVerwaltung.addChildMenuItems(new MenuItem("contracts", "Verträge", ContractsWrapper));
                menuVerwaltung.addChildMenuItems(new MenuItem("Verwaltungsgruppen", "Verwaltungsgruppen", AdministrationGroupsWrapper));

        //////////////////////////////////////////////////
    }

}
