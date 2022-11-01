import { useQuery, gql, QueryHookOptions } from '@apollo/client';

interface Commit {
	node: {
		id: string;
		message: string;
		author: { name: string };
		committedDate: string;
	};
}

interface CommitsData {
	node: {
		defaultBranchRef: {
			target: {
				history: {
					pageInfo: {
						startCursor: string;
						endCursor: string;
					};
					totalCount: number;
					edges: Commit[];
				};
			};
		};
	};
}

const GET_COMMITS = gql`
	query GetCommits(
		$id: ID!
		$first: Int
		$last: Int
		$before: String
		$after: String
	) {
		node(id: $id) {
			... on Repository {
				defaultBranchRef {
					target {
						... on Commit {
							history(
								first: $first
								last: $last
								before: $before
								after: $after
							) {
								totalCount
								pageInfo {
									startCursor
									endCursor
								}
								edges {
									node {
										... on Commit {
											id
											message
											author {
												name
											}
											committedDate
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;
export default function useCommits(options: QueryHookOptions) {
	return useQuery<CommitsData>(GET_COMMITS, options);
}
