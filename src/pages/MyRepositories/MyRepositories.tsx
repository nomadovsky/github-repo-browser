import {
	Alert,
	Avatar,
	CircularProgress,
	Container,
	Card,
	CardHeader,
	Divider,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	TablePagination,
} from '@mui/material';
import { useState } from 'react';
import useUserRepositories from '../../hooks/useUserRepositories';
import formatDate from '../../utils/formatDate';

const MyRepositories = (): JSX.Element => {
	const RESULTS_PER_PAGE = 5;
	const [totalPageNumber, setTotalPageNumber] = useState(0);
	const [before, setBefore] = useState('');
	const [page, setPage] = useState(0);
	const [after, setAfter] = useState('');

	const { loading, error, data, refetch } = useUserRepositories({
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
		variables: {
			before: null,
			after: null,
			first: RESULTS_PER_PAGE,
			last: null,
		},
		onCompleted: (data) => {
			setTotalPageNumber(data.user.repositories.totalCount);
			setBefore(data.user.repositories.pageInfo.startCursor);
			setAfter(data.user.repositories.pageInfo.endCursor);
		},
	});

	const handlePageChange = async (event: unknown, newPage: number) => {
		if (loading) return;
		setPage(newPage);
		if (newPage > page) {
			refetch({
				before: null,
				after: after,
				first: RESULTS_PER_PAGE,
				last: null,
			});
		} else {
			refetch({
				before: before,
				after: null,
				first: null,
				last: RESULTS_PER_PAGE,
			});
		}
	};

	return (
		<Container maxWidth="sm">
			<Card
				sx={{ minHeight: '50vh', display: 'flex', flexDirection: 'column' }}
			>
				<CardHeader subtitle="Subtitle" title="My repositories" />
				<Divider />
				{loading && <CircularProgress sx={{ margin: 'auto' }} />}
				{error && (
					<Alert
						sx={{
							margin: 'auto',
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
						}}
						severity="error"
					>
						Something went wrong
					</Alert>
				)}

				<List>
					{data &&
						data.user.repositories.edges.map(({ node }) => (
							<ListItem button key={node.id}>
								<ListItemAvatar>
									<Avatar
										src={data.user.avatarUrl}
										alt={data.user.name || 'user avatar'}
									/>
								</ListItemAvatar>
								<ListItemText
									primary={node.name}
									secondary={`Created at ${formatDate(node.createdAt)}`}
								/>
							</ListItem>
						))}
				</List>
			</Card>
			<TablePagination
				rowsPerPageOptions={[]}
				component="div"
				count={totalPageNumber}
				page={page}
				onPageChange={handlePageChange}
				rowsPerPage={RESULTS_PER_PAGE}
			/>
		</Container>
	);
};

export default MyRepositories;
