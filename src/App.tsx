import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './layout/Navbar/Navbar';
import FindRepository from './pages/FindRepository/FindRepository';
import MyRepositories from './pages/MyRepositories/MyRepositories';
import RepositoryPage from './pages/RepositoryPage/RepositoryPage';

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
					<Route path="/search" element={<FindRepository />} />
				</Routes>
			</Box>
		</ThemeProvider>
	);
}
