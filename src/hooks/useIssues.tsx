import { useQuery, gql, QueryHookOptions } from '@apollo/client';

interface Issue {
	node: {
		id: string;
		author: {
			login: string;
		};
		title: string;
		updatedAt: string;
	};

	totalCount: number;
	pageInfo: {
		startCursor: string;
		endCursor: string;
	};
}

interface IssuesData {
	node: {
		issues: {
			edges: Issue[];
		};
	};
}

const GET_ISSUES = gql`
	query GetIssues(
		$id: ID!
		$first: Int
		$last: Int
		$before: String
		$after: String
	) {
		node(id: $id) {
			... on Repository {
				issues(first: $first, last: $last, before: $before, after: $after) {
					edges {
						node {
							author {
								login
							}
							title
							updatedAt
						}
					}
					totalCount
					pageInfo {
						startCursor
						endCursor
					}
				}
			}
		}
	}
`;
export default function useIssues(options: QueryHookOptions) {
	return useQuery<IssuesData>(GET_ISSUES, options);
}
