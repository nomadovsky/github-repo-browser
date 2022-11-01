import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import CommitsList from './CommitsList/CommitsList';
import Details from './Details/Details';
import IssuesList from './IssuesList/IssuesList';
import ReleasesList from './ReleasesList/ReleasesList';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography component={'div'}>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const RepositoryPage = () => {
	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Container maxWidth="md">
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="repository tabs"
						variant="fullWidth"
					>
						<Tab label="Details" {...a11yProps(0)} />
						<Tab label="Commits" {...a11yProps(1)} />
						<Tab label="Issues" {...a11yProps(2)} />
						<Tab label="Releases" {...a11yProps(3)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<Details />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<CommitsList />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<IssuesList />
				</TabPanel>
				<TabPanel value={value} index={3}>
					<ReleasesList />
				</TabPanel>
			</Box>
		</Container>
	);
};

export default RepositoryPage;
