import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from '@reduxjs/toolkit/query/react';
import {TokenResponse} from "../types/token";
import {AddUserRequest, AddUserResponse, GetUsersRequest, GetUsersResponse} from "../types/users";
import {PositionsResponse} from "../types/positions";

interface CustomFetchArgs extends FetchArgs {
    isNeedToken?: boolean;
}

export const API_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1'

const baseQuery: BaseQueryFn<string | CustomFetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta> = (args, api, extraOptions) => fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers) => {
        try {
            if(typeof args !== 'string' && args?.isNeedToken){
                const tokenResponse = await fetch(API_URL + '/token');
                const result: TokenResponse = await tokenResponse.json();
                if(result.success){
                    headers.set('Token', result.token);
                }
                //headers.set('Content-Type', 'multipart/form-data');
            }
            return headers;
        } catch (error) {
            console.error(error)
        }
    },
})(args, api, extraOptions);

export const testTaskApi = createApi({
    reducerPath: 'testTask/api',
    baseQuery,
    tagTypes: ['Users'],
    endpoints: (build) => ({
        getUsers: build.query<GetUsersResponse, GetUsersRequest>({
            query: (params) => ({
                url: '/users',
                params
            }),
            providesTags: ['Users'],
        }),
        getPositions: build.query<PositionsResponse, void>({
            query: () => ({
                url: '/positions'
            }),
        }),
        addUser: build.mutation<AddUserResponse, AddUserRequest>({
            query: (body) => {
                const {name, email, phone, position_id, photo} = body;
                const formData = new FormData();
                formData.append('photo', photo);
                formData.append('name', name);
                formData.append('email', email);
                formData.append('phone', phone);
                formData.append('position_id', position_id.toString());
                return{
                    method: 'POST',
                    url: '/users',
                    body: formData,
                    formData:true,
                    isNeedToken: true
                }
            },
            invalidatesTags: ['Users']
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetPositionsQuery,
    useAddUserMutation
} = testTaskApi;