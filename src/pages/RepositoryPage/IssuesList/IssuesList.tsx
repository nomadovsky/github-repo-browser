import { useParams } from 'react-router-dom';
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
import useIssues from '../../../hooks/useIssues';

const IssuesList = () => {
	const RESULTS_PER_PAGE = 10;

	const [totalPageNumber, setTotalPageNumber] = useState(0);
	const [before, setBefore] = useState('');
	const [page, setPage] = useState(0);
	const [after, setAfter] = useState('');
	const { repoId } = useParams();

	const { loading, error, data, refetch } = useIssues({
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
			const issues = data.node.issues;
			console.log(issues);
			setTotalPageNumber(issues.totalCount);
			setBefore(issues.pageInfo.startCursor);
			setAfter(issues.pageInfo.endCursor);
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
			{error ||
				(totalPageNumber === 0 && !loading && (
					<Alert
						sx={{
							margin: 'auto',
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
						}}
						severity="error"
					>
						No issues found
					</Alert>
				))}
			{loading && <CircularProgress sx={{ margin: 'auto' }} />}
			<List>
				{data?.node.issues.edges.map((issue) => (
					<ListItem key={issue.node.title}>
						<ListItemText
							primary={issue.node.title}
							secondary={
								<>
									<Typography
										mr={2}
										sx={{ display: 'inline' }}
										component="span"
										variant="overline"
										color="text.primary"
									>
										{`${issue.node.author.login}`}
									</Typography>
									{formatDate(issue.node.updatedAt)}
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

export default IssuesList;
