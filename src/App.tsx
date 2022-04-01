import {ThemeContext} from './context/ThemeContext';
import {HomePage} from './components/HomePage';
import {UsersContextProvider} from './context/UsersContext';

function App() {
	return (
		<main>
			<ThemeContext.Provider value='darker'>
				<UsersContextProvider>
					<HomePage />
				</UsersContextProvider>
			</ThemeContext.Provider>
			<UsersContextProvider>
				<ThemeContext.Provider value='dark'>
					<HomePage />
				</ThemeContext.Provider>
				<ThemeContext.Provider value='darker'>
					<HomePage />
				</ThemeContext.Provider>
			</UsersContextProvider>
		</main>
	);
}

export default App;
