import { useQuery, gql, QueryHookOptions } from '@apollo/client';

interface RepositoryData {
	node: {
		id: string;
		name: string;
		description?: string;
		issues: { totalCount: number };
		releases: { totalCount: number };
		defaultBranchRef: {
			target: {
				history: {
					totalCount: number;
				};
			};
		};
	};
}

const GET_REPO_DETAILS = gql`
	query GetCommits($id: ID!) {
		node(id: $id) {
			... on Repository {
				id
				name
				description
				issues {
					totalCount
				}
				releases {
					totalCount
				}
				defaultBranchRef {
					target {
						... on Commit {
							history(first: 10) {
								totalCount
							}
						}
					}
				}
			}
		}
	}
`;
export default function useRepoDetails(options: QueryHookOptions) {
	return useQuery<RepositoryData>(GET_REPO_DETAILS, options);
}
