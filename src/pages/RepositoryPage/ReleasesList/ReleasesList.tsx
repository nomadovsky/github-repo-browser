import { useState } from 'react';
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
import useReleases from '../../../hooks/useReleases';
import formatDate from '../../../utils/formatDate';

const ReleasesList = () => {
	const RESULTS_PER_PAGE = 5;
	const [totalPageNumber, setTotalPageNumber] = useState(0);
	const [before, setBefore] = useState('');
	const [page, setPage] = useState(0);
	const [after, setAfter] = useState('');
	const { repoId } = useParams();

	const { loading, error, data, refetch } = useReleases({
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
			const releases = data.node.releases;
			setTotalPageNumber(releases.totalCount);
			setBefore(releases.pageInfo.startCursor);
			setAfter(releases.pageInfo.endCursor);
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
			{(error || (data?.node.releases.totalCount === 0 && !loading)) && (
				<Alert
					sx={{
						margin: 'auto',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
					}}
					severity="error"
				>
					No releases found
				</Alert>
			)}
			{loading && <CircularProgress sx={{ margin: 'auto' }} />}
			<List>
				{data?.node.releases.edges.map((release) => (
					<ListItem key={release.node.id}>
						<ListItemText
							primary={release.node.name}
							secondary={
								<>
									<Typography
										mr={2}
										sx={{ display: 'inline' }}
										component="span"
										variant="overline"
										color="text.primary"
									>
										{`${release.node.author.login}`}
									</Typography>
									{` Updated at ${formatDate(release.node.updatedAt)}`}
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

export default ReleasesList;
