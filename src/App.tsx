import { Box } from '@mui/material';
import Navbar from './layout/Navbar/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import MyRepositories from './pages/MyRepositories/MyRepositories';
import RepositoryPage from './pages/RepositoryPage/RepositoryPage';
// import FindRepository from './pages/FindRepository/FindRepository';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

export default function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Navbar />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Routes>
					<Route path="/" element={<MyRepositories />} />
					<Route path="/:repoId" element={<RepositoryPage />} />
					<Route path="/search" element={'<FindRepository />'} />
				</Routes>
			</Box>
		</ThemeProvider>
	);
}
