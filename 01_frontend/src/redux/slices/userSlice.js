import { api } from "../api";

const userSlice = api.injectEndpoints({
    endpoints: (builder) => ({

        registerUser: builder.mutation({
            query: (userData) => ({
                url:"/register",
                method: "POST",
                body: userData,
              }),
              invalidatesTags: ["user"],
          }),
        }),
      
  });
  
  export const { useRegisterUserMutation } = userSlice;
  export default userSlice;