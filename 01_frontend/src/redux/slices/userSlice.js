import { api } from "../api";

const userSlice = api.injectEndpoints({
    endpoints: (builder) => ({

        registerUser: builder.mutation({
            query: (userData) => ({
                url:"/user/register",
                method: "POST",
                body: userData,
              }),
              invalidatesTags: ["user"],
        }),
        loginUser: builder.mutation({
            query: (userData) => ({
                url:"/user/login",
                method: "POST",
                body: userData,
                invalidatesTags: ["user"],
            }),
        }),
        getUserRole: builder.query({
            query: (token)=> ({
                url: `/admin/userRole`,
                method:"GET",
                headers: {
                'Content-Type': 'application/json',  
                'Authorization' : `Bearer ${token}`,
            },
            }),
            providesTags:["user"],
        }),
        getAllUser: builder.query({
            query: (token)=> ({
                url: `/admin/allUsers`,
                method:"GET",
                headers: {
                'Content-Type': 'application/json',  
                'Authorization' : `Bearer ${token}`,
            },
            }),
            providesTags:["user"],
        }),
        getUserInfo: builder.query({
            query: (token)=> ({
                url: `/user/UserInfo`,
                method:"GET",
                headers: {
                'Content-Type': 'application/json',  
                'Authorization' : `Bearer ${token}`,
            },
            }),
            providesTags:["user"],
        }),
        confirmUser: builder.mutation({
            query: ({token, userId }) => ({
                url:"/admin/userConfirm",
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',  
                    'Authorization' : `Bearer ${token}`,
                },
                body: {
                    userId,
                },
            }),
            invalidatesTags: ["user"],
          }),
    }),  
  });
  
  export const { useRegisterUserMutation, useLoginUserMutation, useGetUserRoleQuery, useGetAllUserQuery, useConfirmUserMutation, useGetUserInfoQuery } = userSlice;
  export default userSlice;