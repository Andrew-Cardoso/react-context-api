import React from 'react';
import {UsersContext} from '../../context/UsersContext';

export class UserEdit extends React.Component<{}, {name: string}> {
	state: Readonly<{name: string}> = {name: ''};
	render() {
		return (
			<UsersContext.Consumer>
				{({users, selectedIndex, editUserName}) => {
					const user = users[selectedIndex];
					if (!user) return null;
					console.log('rerender');
					return (
						<div className='edit-user'>
							<h3>Edit {user.name}'s name</h3>
							<input
								type='text'
								value={this.state.name}
								onChange={({target}) => this.setState({name: target.value})}
							/>
							<button
								onClick={() => {
									editUserName(this.state.name);
									this.setState({name: ''});
								}}
							>
								Save
							</button>
						</div>
					);
				}}
			</UsersContext.Consumer>
		);
	}
}
