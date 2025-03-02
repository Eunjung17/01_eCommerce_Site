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

        deleteCart: builder.mutation({
          query: ({ token }) => {
            return {
              url: "/user/delete/Cart",
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            };
          },
          invalidatesTags: ["cart"], 
        }),

    }),  
  });
  
  export const { useGetCartAllQuery, useAddCartMutation, useDeleteCartMutation } = cartSlice;
  export default cartSlice;