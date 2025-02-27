/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { useGetUserRoleQuery, useGetAllUserQuery, useConfirmUserMutation } from '../../redux/slices/userSlice'
import { useGetCategoryAllQuery } from '../../redux/slices/categorySlice'
import { useGetAllProductQuery } from '../../redux/slices/productSlice'
import './ProductDetail.css';

export default function ProductDetail({token, setToken, userRole, setUserRole}) {

    const { data: categories, isLoading1, error1 } = useGetCategoryAllQuery(token);
    const { data: allProduct, isLoading2, error2 } = useGetAllProductQuery(token);
    console.log(allProduct);

    const [activeTab, setActiveTab] = useState("nav-home");

    const [activeIndex, setActiveIndex] = useState(null); 

    const placeOrder  = async () => { 

  }

  const cancel  = () => {
      navigate("/");
  }


    const togglePanel = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    if (isLoading1 || isLoading2) return <div>Loading categories...</div>;
    if (error1 || error2) return <div>Error loading categories</div>;


    const handleTabClick = (tabId) => {
        setActiveTab(tabId); 
    };

    return(
        <>
            <div className="row">
                <div className="middle2column">
                    <div className="card">

                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button 
                                className={`nav-link ${activeTab === "nav-home" ? "active" : ""}`} 
                                id="nav-home-tab" 
                                data-bs-toggle="tab" 
                                data-bs-target="#nav-home" 
                                type="button" 
                                role="tab" 
                                aria-controls="nav-home" 
                                aria-selected={activeTab === "nav-home"}
                                onClick={() => handleTabClick("nav-home")}
                            >
                                Registred Product
                            </button>
                            <button 
                                className={`nav-link ${activeTab === "nav-profile" ? "active" : ""}`} 
                                id="nav-profile-tab" 
                                data-bs-toggle="tab" 
                                data-bs-target="#nav-profile" 
                                type="button" 
                                role="tab" 
                                aria-controls="nav-profile" 
                                aria-selected={activeTab === "nav-profile"}
                                onClick={() => handleTabClick("nav-profile")}
                            >
                                New Product Registration
                            </button>
                            <button 
                                className={`nav-link ${activeTab === "nav-contact" ? "active" : ""}`} 
                                id="nav-contact-tab" 
                                data-bs-toggle="tab" 
                                data-bs-target="#nav-contact" 
                                type="button" 
                                role="tab" 
                                aria-controls="nav-contact" 
                                aria-selected={activeTab === "nav-contact"}
                                onClick={() => handleTabClick("nav-contact")}
                            >
                                Deleted Product
                            </button>
                        </div>
                    </nav>

                    <div className="tab-content" id="nav-tabContent">

                        <div 
                            className={`tab-pane fade ${activeTab === "nav-home" ? "show active" : ""}`} 
                            id="nav-home" 
                            role="tabpanel" 
                            aria-labelledby="nav-home-tab"
                        >

                            <table className="table table-hover table-group-divider">
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
                                        <th scope="row">{p?.categoryDetail?.category?.name} &gt; {p?.categoryDetail?.name}</th>
                                        <th scope="row">{p.name}</th>
                                        <td><img className="bookCoverSize" src={p.images} alt={p.id} /></td>
                                        <td><h6>{p.description}</h6></td>
                                        <td><h6>${p.price}</h6></td>
                                        <td>{p.quantity}</td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr><td colSpan="6">There is no product.</td></tr>
                                  )}
                                </tbody>
                            </table>
                        </div>


                        <div 
                            className={`tab-pane fade ${activeTab === "nav-profile" ? "show active" : ""}`} 
                            id="nav-profile" 
                            role="tabpanel" 
                            aria-labelledby="nav-profile-tab"
                        >

                            <table className="table table-hover">

                                <tbody className="table-group-divider">
                                      <tr>
                                        <th scope="row">Main Category</th>
                                        <th scope="row">
                                          <input type="mainCatetory" className="form-control" id="mainCatetory" aria-describedby="emailHelp" placeholder=""/>
                                        </th>
                                      </tr>
                                      <tr>
                                        <th scope="row">Sub Category</th>
                                        <th scope="row">
                                          <input type="subCatetory" className="form-control" id="subCatetory" aria-describedby="emailHelp" placeholder=""/>
                                        </th>
                                      </tr>
                                      <tr>
                                        <th scope="row">Product Name</th>
                                        <th scope="row">
                                          <input type="name" className="form-control" id="name" aria-describedby="emailHelp" placeholder=""/>
                                        </th>
                                      </tr>
                                      <tr>
                                        <th scope="row">Product Description</th>
                                        <th scope="row">
                                          <input type="description" className="form-control" id="description" aria-describedby="emailHelp" placeholder=""/>
                                        </th>
                                      </tr>
                                      <tr>
                                        <th scope="row">Images</th>
                                        <th scope="row">
                                          <input type="images" className="form-control" id="images" aria-describedby="emailHelp" placeholder=""/>
                                        </th>
                                      </tr>
                                      <tr>
                                        <th scope="row">Price</th>
                                        <th scope="row">
                                          <input type="price" className="form-control" id="price" aria-describedby="emailHelp" placeholder=""/>
                                        </th>
                                      </tr>
                                      <tr>
                                        <th scope="row">Quantity</th>
                                        <th scope="row">
                                          <input type="quantity" className="form-control" id="quantity" aria-describedby="emailHelp" placeholder=""/>
                                        </th>
                                      </tr>
                                      <tr>
                                        <td colSpan="2">
                                          <button type="button" className="btn btn-primary btn-lg" style={{width:'200px', margin:'20px'}} onClick={placeOrder}>Save</button>
                                          <button type="button" className="btn btn-primary btn-lg" style={{width:'200px', margin:'20px'}} onClick={cancel}>Cancel</button>
                                        </td>
                                      </tr>
                                </tbody>
                            </table>

                        </div>


                        <div 
                            className={`tab-pane fade ${activeTab === "nav-contact" ? "show active" : ""}`} 
                            id="nav-contact" 
                            role="tabpanel" 
                            aria-labelledby="nav-contact-tab"
                        >

                            <p>Content for deleted products...</p>
                        </div>
                    </div>

                    {/* <div style={{display:'flex',float:'right',margin:'20px'}}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{ marginRight: '10px' }} />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </div> */}

                    </div>
                </div>
            </div>
        </>
    );
}
