import { useQuery, gql, QueryHookOptions } from '@apollo/client';

interface Repository {
	node: {
		id: string;
		name: string;
		createdAt: string;
	};
}

interface UserRepositoriesData {
	user: {
		name: string | null;
		avatarUrl: string;
		repositories: {
			pageInfo: {
				startCursor: string;
				endCursor: string;
			};
			edges: Repository[];
			totalCount: number;
		};
	};
}

const userName = process.env.REACT_APP_GITHUB_USER;

const GET_USER_REPOSITORIES = gql`
query GetUserRepositories(
    $first: Int
    $last: Int
    $before: String
    $after: String
) {
    user(login: "${userName}") {
        name
        avatarUrl
        repositories(
            first: $first
            last: $last
            before: $before
            after: $after
            orderBy: { field: CREATED_AT, direction: DESC }
        ) {
            totalCount
            pageInfo {
                startCursor
                endCursor
            }
            edges {
                node {
                    id
                    name
                    createdAt
                }
            }
        }
    }
}
`;
export default function useUserRepositories(options: QueryHookOptions) {
	return useQuery<UserRepositoriesData>(GET_USER_REPOSITORIES, options);
}
