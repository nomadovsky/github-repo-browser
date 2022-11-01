import { Alert, Container, CircularProgress, Typography } from '@mui/material';
import useRepoDetails from '../../../hooks/useRepoDetails';
import { useParams } from 'react-router-dom';

const Details = () => {
	const { repoId } = useParams();
	const { loading, error, data } = useRepoDetails({
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
		variables: {
			id: repoId,
		},
	});
	return (
		<Container>
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
					Repository not found
				</Alert>
			)}
			{data && (
				<>
					<Typography variant="h2">{data.node.name}</Typography>
					<Typography
						sx={{ mt: 3, mb: 1.5 }}
						color="text.secondary"
						variant="subtitle1"
					>
						{data.node.description || 'No description'}
					</Typography>
					<Typography
						variant="overline"
						sx={{ fontSize: 16 }}
						display="inline-block"
						pr={3}
					>
						{`Issues: ${data.node.issues.totalCount || 0}`}
					</Typography>
					<Typography
						variant="overline"
						sx={{ fontSize: 16 }}
						display="inline-block"
						pr={3}
					>
						{`Releases: ${data.node.releases.totalCount || 0}`}
					</Typography>
					<Typography
						variant="overline"
						sx={{ fontSize: 16 }}
						display="inline-block"
						gutterBottom
					>
						{`Commits: ${
							data.node.defaultBranchRef.target.history.totalCount || 0
						}`}
					</Typography>
				</>
			)}
		</Container>
	);
};

export default Details;
