import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mydata = createApi({
  reducerPath: "mydata",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.itaxeasy.com/webinvoice/",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => ({
        url: "/getAllCustomer",
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getSingleData: builder.query({
      query: (id) => ({
        url: `getOneCustomers/${id}`,
        method: "GET",
      }),
    }),
    addNewPostData: builder.mutation({
      query: (payload) => ({
        url: "/addCustomer/",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/deleteCustomers/${id}`,
        method: "DELETE",
      }),
    }),
    updateData: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/updateCustomers/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    // -------------------------------------Add Suplier Api---------------------------
    addSupplier: builder.mutation({
      query: (payload) => ({
        url: "addSuppliers/",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    getALlSuplier: builder.query({
      query: () => ({
        url: "/getAllSuppliers",
        method: "GET",
      }),
    }),
    deleteSuplier: builder.mutation({
      query: (id) => ({
        url: `/deleteSuppliers/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useGetSingleDataQuery,
  useAddNewPostDataMutation,
  useDeletePostMutation,
  useUpdateDataMutation,
  useAddSupplierMutation,
  useGetALlSuplierQuery,
  useDeleteSuplierMutation,
} = mydata;
