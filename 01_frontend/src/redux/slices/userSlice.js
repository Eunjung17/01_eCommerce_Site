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

    }),  
  });
  
  export const { useRegisterUserMutation, useLoginUserMutation } = userSlice;
  export default userSlice;