import { useParams } from 'react-router-dom';
import useCommits from '../../../hooks/useCommits';

import {
	Alert,
	CircularProgress,
	Divider,
	List,
	ListItem,
	ListItemText,
	TablePagination,
	Typography,
} from '@mui/material';
import formatDate from '../../../utils/formatDate';
import { useState } from 'react';

const CommitsList = () => {
	const RESULTS_PER_PAGE = 5;

	const [totalPageNumber, setTotalPageNumber] = useState(0);
	const [before, setBefore] = useState('');
	const [page, setPage] = useState(0);
	const [after, setAfter] = useState('');
	const { repoId } = useParams();

	const { loading, error, data, refetch } = useCommits({
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
		variables: {
			id: repoId,
			before: null,
			after: null,
			first: RESULTS_PER_PAGE,
			last: null,
		},
		onCompleted: (data) => {
			const commits = data.node.defaultBranchRef.target.history;
			setTotalPageNumber(commits.totalCount);
			setBefore(commits.pageInfo.startCursor);
			setAfter(commits.pageInfo.endCursor);
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
		<>
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
					No commits found
				</Alert>
			)}
			<List>
				{data?.node.defaultBranchRef.target.history.edges.map((commit) => (
					<ListItem key={commit.node.id}>
						<ListItemText
							sx={{ display: 'block' }}
							primary={commit.node.message}
							secondary={
								<>
									<Typography
										mr={1}
										sx={{ display: 'inline-block' }}
										component="span"
										variant="overline"
										color="text.primary"
									>
										{`${commit.node.author.name}`}
									</Typography>
									{formatDate(commit.node.committedDate)}
								</>
							}
						/>
					</ListItem>
				))}
			</List>
			<Divider />
			<TablePagination
				rowsPerPageOptions={[]}
				component="div"
				count={totalPageNumber}
				page={page}
				onPageChange={handlePageChange}
				rowsPerPage={RESULTS_PER_PAGE}
			/>
		</>
	);
};

export default CommitsList;
