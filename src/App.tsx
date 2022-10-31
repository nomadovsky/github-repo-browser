import { Box } from '@mui/material';
import MyRepositories from './pages/MyRepositories/MyRepositories';
export default function App() {
	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				py: 8,
			}}
		>
			<MyRepositories />
		</Box>
	);
}
