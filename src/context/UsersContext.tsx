import React from 'react';

export interface User {
	name: string;
	age: number;
}

export interface UsersContextType {
	users: User[];
	selectedIndex: number;
	updateUser: (user: User) => void;
	selectUser: (user: User) => void;
	editUserName: (name: string) => void;
}

export const UsersContext = React.createContext<UsersContextType>({
	users: [],
	selectedIndex: -1,
	updateUser: () => {},
	selectUser: () => {},
	editUserName: () => {},
});

interface UsersContextProviderState {
	users: User[];
	selectedIndex: number;
}

export class UsersContextProvider extends React.Component<{}, UsersContextProviderState> {
	state: Readonly<UsersContextProviderState> = {
		users: [],
		selectedIndex: -1,
	};

	handleSelectUser(user: User) {
		const index = this.state.users.findIndex(({name}) => name === user.name);
		this.setState({...this.state, selectedIndex: index});
	}

	handleUpdateUser(user: User) {
		const i = this.state.users.findIndex(({name}) => name === user.name);
		const users = this.state.users;
		i < 0 ? users.push(user) : users.splice(i, 1, user);
		this.setState({users});
	}

	handleEditName(name: string) {
		const users = [...this.state.users];
		const user = users[this.state.selectedIndex];
		if (!user) return;
		users.splice(this.state.selectedIndex, 1, {name, age: user.age});
		this.setState({users, selectedIndex: -1});
	}

	render() {
		const users = this.state.users;
		const updateUser = (user: User) => this.handleUpdateUser(user);
		const selectUser = (user: User) => this.handleSelectUser(user);
		const editUserName = (name: string) => this.handleEditName(name);
		const selectedIndex = this.state.selectedIndex;
		return (
			<UsersContext.Provider
				value={{users, updateUser, selectUser, editUserName, selectedIndex}}
			>
				{this.props.children}
			</UsersContext.Provider>
		);
	}
}
