import { api } from "../api";

const productSlice = api.injectEndpoints({
    endpoints: (builder) => ({

        getAllProduct: builder.query({
            query: (token)=> ({
                url: `/business/allProducts`,
                method:"GET",
                headers: {
                'Content-Type': 'application/json',  
                'Authorization' : `Bearer ${token}`,
            },
            }),
            providesTags:["product"],
        }),

        getTop4Product: builder.query({
            query: (token)=> ({
                url: `/top4Products`,
                method:"GET",
                headers: {
                'Content-Type': 'application/json',  
                'Authorization' : `Bearer ${token}`,
            },
            }),
            providesTags:["product"],
        }),

    }),  
  });

  
  export const { useGetAllProductQuery, useGetTop4ProductQuery } = productSlice;
  export default productSlice;