import React, {useState} from 'react';

export const ExampleContext = React.createContext(null);

export const UserWrapper = (props) => {
	const [ store, setStore ] = useState({
		user: props.user
	});
	const [ actions, setActions ] = useState({
		setUser: async (user) => {
			store.user = user;
			await setStore({ ...store, user: store.user })
		}
	});

	return (
		<ExampleContext.Provider value={{ store, actions }}>
			{props.children}
		</ExampleContext.Provider>
	);
}