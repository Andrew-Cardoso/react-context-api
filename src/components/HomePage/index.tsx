import React from 'react';
import {ThemeContext} from '../../context/ThemeContext';
import {User, UsersContext} from '../../context/UsersContext';
import {UserEdit} from '../UserEdit';

import './index.css';

interface State {
	user: string;
	age: number;
}

export class HomePage extends React.Component<{}, State> {
	static contextType = UsersContext;
	state: Readonly<State> = {age: 0, user: ''};

	render() {
		return (
			<ThemeContext.Consumer>
				{(theme) => (
					<div className={`main-content ${theme}`}>
						<h1> Home Page </h1>
						<p>Theme: {theme}</p>
						<ul>
							{this.context.users.map((user: User, index: number) => (
								<li className={index === this.context.selectedIndex ? 'selected' : ''} key={user.name} onClick={() => this.context.selectUser(user)}>
									{user.name} is {user.age} years old
								</li>
							))}
						</ul>
						<div className='form'>
							<input
								type='text'
								placeholder='new user name'
								value={this.state.user}
								onChange={({target}) =>
									this.setState({...this.state, user: target.value})
								}
							/>
							<input
								type='number'
								placeholder='new user age'
								value={this.state.age}
								onChange={({target}) =>
									this.setState({...this.state, age: target.valueAsNumber || 0})
								}
							/>
							<button
								onClick={() =>
									this.context.updateUser({
										age: this.state.age,
										name: this.state.user,
									})
								}
							>
								Add User
							</button>
						</div>
						<UserEdit />
					</div>
				)}
			</ThemeContext.Consumer>
		);
	}
}

// {(context) => (
// 	<>

// 	</>
// )}
