import { api } from "../api";

const cartSlice = api.injectEndpoints({
    endpoints: (builder) => ({

        getCartAll: builder.query({
            query: (token)=> ({
                url: `/user/getCart`,
                method:"GET",
                headers: {
                'Content-Type': 'application/json',  
                'Authorization' : `Bearer ${token}`,
            },
            }),
            providesTags:["cart"],
        }),

        addCart: builder.mutation({
            query: ({ token, productId, quantity }) => {
            //   console.log('token:', token); // Log the token
            //   console.log('userData:', productId); // Log the userData
            //   console.log('quantity:', quantity); // Log the userData
              
              return {
                url: "/user/addCart",
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
                body: { productId, quantity },
              };
            },
            invalidatesTags: ["cart"],
          }),

    }),  
  });
  
  export const { useGetCartAllQuery, useAddCartMutation } = cartSlice;
  export default cartSlice;