import React, {FunctionComponent} from 'react';
import {LoginTemplate} from '../templates/LoginTemplate';
import {RequestResetPasswordForm} from "./RequestResetPasswordForm";
import {ResetPasswordForm} from "./ResetPasswordForm";

export const ResetPassword: FunctionComponent = (props) => {

	const params = props.route.params;
	let token = params?.token;

	let content = <RequestResetPasswordForm navigation={props.navigation} />;
	if(!!token){
		content = <ResetPasswordForm navigation={props.navigation} token={token} />;
	}

	return (
		content
	)
}