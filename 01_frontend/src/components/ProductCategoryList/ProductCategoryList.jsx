/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect  } from "react";
import { useProductFromCategoryMutation } from '../../redux/slices/productSlice'
import { useAddCartMutation } from '../../redux/slices/cartSlice'

import './ProductCategoryList.css';

export default function ProductCategoryList({token, setToken, userRole, setUserRole}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { categoryDetailId = null } = location.state || {};
    console.log("categoryDetailId in ProductCategoryList: ", categoryDetailId);

    const [ addCartApi, {isLoading2, error2}] = useAddCartMutation();
    const [ products, {isLoading, error}] = useProductFromCategoryMutation();
    const [categoryData, setCategoryData] = useState(null);
    const [ alert, setAlert ] = useState(null);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        
        console.log("categoryDetailId", categoryDetailId);
        if(categoryDetailId){
            const fetchOrderDetails = async () => {

                try {
                    const response = await products({categoryDetailId}).unwrap(); 
                    console.log("orderDetail response: ", response);
                    setCategoryData(response);

                } catch (error) {
                    setAlert("something wrong.");
                    console.log(error);
                }
        };

        fetchOrderDetails();
        }

    }, [categoryDetailId, token]);

    const handleClose = () => {

        setFadeOut(true);
        setTimeout(() => {
            setAlert("");
            setFadeOut(false);
        }, 600);
    }

    const cart = async (productId, quantity) => {
        console.log("productId: " ,productId);
        console.log("quantity: " ,quantity);

        setAlert(null);


        if(!token) return setAlert("Log-in First.");
        else if(userRole === '2') return setAlert("Business user can't order products."); 
        else if(userRole === '3') return setAlert("Admin user can't order products."); 
        else{

            console.log("again:" , token, " ",productId," ", quantity);
            const response = await addCartApi({token, productId, quantity}).unwrap(); 

            console.log("addCartApi response:" ,response);

            navigate("/UserCart");
        }
}

    const order  = () => {

        setAlert(null);
        if(!token ||!userRole) setAlert("Login required.");
        else navigate("/");
    }


    if (isLoading || isLoading2) return <div>Loading categories...</div>;
    if (error || error2) return <div>Error loading categories</div>;
   
    return(
        <>

        <div className="row">
            <div className="middle2column">
                <div className="card">

                {alert &&
                    <div id="notification" className={`alert warning ${fadeOut ? 'fade-out' : ''}`} onClick={handleClose}>
                        <span className="closebtn">&times;</span>  
                        <strong>Warning!</strong> {alert}
                    </div>
                }


                    {/* <div style={{display:'flex',float:'right',margin:'20px'}}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{ marginRight: '10px' }} />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </div> */}

                <table className="table table-hover">
                    <thead>
                        
                    </thead>
                    <tbody className="table-group-divider">
                    {isLoading && <tr><td colSpan="6">Loading Books...</td></tr>}
                    {
                        !isLoading && categoryData ? (
                            categoryData.map((p) => (
                            <React.Fragment key={p?.id}>
                                <tr>
                                <th scope="col">Category</th>
                                <th colSpan="4" scope="col">{p.category.name} &gt; {p.name}</th>
                                </tr>
                                <tr>
                                <td scope="row"></td>
                                <td colSpan="4" scope="row"><i>{p.description}</i></td>
                                </tr>
                                
                                <tr className="table-group-divider">
                                    <td>Product Name</td>
                                    <td>Image</td>
                                    <td style={{width:"30%"}}>Description</td>
                                    <td>Price</td>
                                    <td>Add to Cart</td>
                                    <td>Buy Now</td>
                                </tr>
                                {p.product && p.product.length > 0 ? (
                                p.product.map((product, index) => (
                                    <React.Fragment key={index}>
                                    <tr >
                                        <td>{product.name}</td>
                                        <td><img className = "bookCoverSize" src={product.images} alt={product.id} /></td>
                                        <td>{product.description}</td>
                                        <td>$ {product.price}</td>
                                        <td><button className="btn btn-success" type="submit" style={{margin: '5px'}} onClick={()=>cart(product.id, 1)}>Cart</button></td>
                                        <td><button className="btn btn-primary" type="submit" style={{margin: '5px'}}>Order</button></td>

                                        
                                        
                                    </tr>
                                    </React.Fragment>
                                ))
                                ) : (
                                <tr>
                                    <td colSpan="2">No products available</td>
                                </tr>
                                )}

                            </React.Fragment>
                            ))
                        ) : (
                            <tr><td colSpan="6">There is no product.</td></tr>
                        )
                        }
                    </tbody>
                </table>

                            
                            
                </div>


            </div>
        </div>
           
        </>
    );
}