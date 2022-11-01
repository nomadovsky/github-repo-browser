import { useQuery, gql, QueryHookOptions } from '@apollo/client';

interface Release {
	node: {
		id: string;
		author: {
			login: string;
		};
		name: string;
		updatedAt: string;
	};
}

interface ReleasesData {
	node: {
		releases: {
			edges: Release[];
			totalCount: number;
			pageInfo: {
				startCursor: string;
				endCursor: string;
			};
		};
	};
}

const GET_RELEASES = gql`
	query GetReleases(
		$id: ID!
		$first: Int
		$last: Int
		$before: String
		$after: String
	) {
		node(id: $id) {
			... on Repository {
				releases(first: $first, last: $last, before: $before, after: $after) {
					edges {
						node {
							id
							author {
								login
							}
							name
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
export default function useReleases(options: QueryHookOptions) {
	return useQuery<ReleasesData>(GET_RELEASES, options);
}
