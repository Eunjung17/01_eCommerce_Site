/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useGetUserRoleQuery, useGetAllUserQuery, useConfirmUserMutation } from '../../redux/slices/userSlice'
import { useGetCategoryAllQuery } from '../../redux/slices/categorySlice'
import { useGetAllProductQuery } from '../../redux/slices/productSlice'
import './ProductDetail.css';

export default function ProductDetail({token, setToken, userRole, setUserRole}) {

    const { data: categories, isLoading1, error1 } = useGetCategoryAllQuery(token);
    const { data: allProduct, isLoading2, error2 } = useGetAllProductQuery(token);

    const [activeIndex, setActiveIndex] = useState(null); 

    // Toggle the panel based on the index
    const togglePanel = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Close if already open, open if closed
    };

    if (isLoading1 || isLoading2) return <div>Loading categories...</div>;
    if (error1 || error2) return <div>Error loading categories</div>;

    return(
        <>
            <div className="row">
                <div className="middle2column">
                    <div className="card">


                    <div style={{display:'flex',float:'right',margin:'20px'}}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{ marginRight: '10px' }} />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </div>




                    <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {isLoading2 && <tr><td colSpan="6">Loading Books...</td></tr>}
              {!isLoading2 && allProduct ? (
                allProduct.map((p) => (
                  <tr key={p.id}>
                    <th scope="row">{p.categoryDetailId}</th>
                    <th scope="row">{p.name}</th>
                    <td><img className = "bookCoverSize" src={p.images} alt={p.id} /></td>
                    <td><h6>{p.description}</h6></td>
                    <td><h6>{p.price}</h6></td>
                    <td>{p.quantity}</td>
                  </tr>
                      ))
                    ) : (
                      <tr><td colSpan="6">There is no product.</td></tr>
                )}
            </tbody>
          </table>
                    
                    
                    </div>


                </div>
            </div>
        </>
    );
}