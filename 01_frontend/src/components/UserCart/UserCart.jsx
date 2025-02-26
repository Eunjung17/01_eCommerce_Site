/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect  } from "react";
// import { useGetUserRoleQuery, useGetAllUserQuery, useConfirmUserMutation } from '../../redux/slices/userSlice'
import { useGetCartAllQuery } from '../../redux/slices/cartSlice'
import { useGetUserInfoQuery } from '../../redux/slices/userSlice'
import { useGetPaymentMethodQuery, useRegisterOrderFromCartMutation } from '../../redux/slices/orderSlice'

import './UserCart.css';

export default function UserCart({token, setToken, userRole, setUserRole}) {
    const navigate = useNavigate();

    const { data: cartAll, isLoading, error } = useGetCartAllQuery(token);
    const { data: userInfo, isLoading2, error2 } = useGetUserInfoQuery(token);
    const { data: paymentMethod, isLoading3, error3 } = useGetPaymentMethodQuery(token);
    const [ registerOrderFromCartApi, {isLoading4, error4}] = useRegisterOrderFromCartMutation();

    const [fadeOut, setFadeOut] = useState(false);
    const [ alert, setAlert ] = useState(null);
    const [ buttonFlag, setButtonFlag ] = useState(null);
    const [ addressFlag, setAddressFlag ] = useState(null);
    const [ nameFlag, setNameFlag ] = useState(null);
    const [ phoneFlag, setPhoneFlag ] = useState(null);
    const [totalItems, setTotalItems] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [totalQuantity, setTotalQuantity] = useState(null);

    const [ orderData, setOrderData] = useState({
        newName: '',
        newAddress: '',
        newPhone: '',
        paymentMethod: '0',
    });

    const selectRef = useRef(null);


    console.log("userInfo:", userInfo);
    console.log("cartAll:" ,cartAll);

    
    const handleClose = () => {

        setFadeOut(true);
        setTimeout(() => {
            setAlert("");
            setFadeOut(false);
        }, 600);
    }

    const showOrderInfo  = () => {

        setAlert(null);

        setButtonFlag("noShow");

        if(!token ||!userRole) setAlert("Login required.");
        else{

            setOrderData(prevOrderData => {
                let updatedOrderData = { ...prevOrderData };
    
                if (updatedOrderData.newName === '') {
                    updatedOrderData.newName = userInfo?.firstName + " " + userInfo?.lastName;
                }
                if (updatedOrderData.newAddress === '') {
                    updatedOrderData.newAddress = userInfo?.address;
                }
                if (updatedOrderData.newPhone === '') {
                    updatedOrderData.newPhone = userInfo?.phone;
                }
    
                return updatedOrderData; // Return the updated orderData to be set
            });

            if(cartAll){
                console.log(cartAll.length);
                console.log(cartAll.reduce((acc,p) => acc + p.product.price , 0));
                console.log(cartAll.reduce((acc,p) => acc + p.quantity , 0));

                setTotalItems(cartAll.length);
                setTotalQuantity(cartAll.reduce((acc,p) => acc + p.quantity , 0));
                setTotalPrice(cartAll.reduce((acc,p) => acc + p.product.price * p.quantity , 0));

                console.log("totalItems totalPrice totalQuantity : ", totalItems, totalPrice, totalQuantity);
            }
        }

    }

    // check about product quantity to order, change quantity number in product table
    //create order detail, order, delete cartDetail, move to order confirm page
    const placeOrder  = async () => { 
        setAlert(null);

        if(!token ||!userRole) setAlert("Login required.");
        if(selectRef.current.value === "0"){
            return setAlert("Select payment method to order.");
        }else{
            setOrderData(prevOrderData => {
                let updatedOrderData = { ...prevOrderData };

                updatedOrderData.paymentMethod = selectRef.current.value;
    
                return updatedOrderData; // Return the updated orderData to be set
            });
        }
        
        console.log("userInfo.id in placeOrder:", userInfo.id);
        console.log("orderData in placeOrder:", orderData);

        const orderResponse = await registerOrderFromCartApi({token, orderData}).unwrap(); 

    console.log(orderResponse);

        navigate(`/UserOrderDetail`, {
            state: { orderId: orderResponse.id }
        });
    }

    const cancel  = () => {
        navigate("/");
    }

    const addressChange  = () => {
        setAddressFlag("change");
    }
    
    const nameChange  = () => {
        setNameFlag("change");
    }
    
    const phoneChange  = () => {
        setPhoneFlag("change");
    }

    const handleChange = (e) => {
        setOrderData({...orderData, [e.target.name]: e.target.value});
        console.log("orderData in handleChange:", orderData);
    }


    if (isLoading || isLoading2 || isLoading3 || isLoading4) return <div>Loading categories...</div>;
    if (error || error2 || error3 || error4) return <div>Error loading categories</div>;

    return(
        <>
            <div className="row">
                <div className="middle2column">
                    <div className="card">
 
                        {alert &&
                            <div>{alert}</div> 
                        }
                        <h5 className="card-title"><i>In My Cart</i></h5>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Category</th>
                                <th scope="col">Name</th>
                                <th scope="col">Image</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {isLoading && <tr><td colSpan="6">Loading Cart...</td></tr>}
                            {!isLoading && cartAll ? (
                                cartAll.map((p) => (
                                <tr key={p.id}>
                                    <th scope="row">{p?.product?.categoryDetail?.category?.name}</th>
                                    <th scope="row">{p?.product?.name}</th>
                                    <td><img className = "bookCoverSize" src={p?.product?.images} alt={p.id} /></td>
                                    <td><h6>{p?.product?.description}</h6></td>
                                    <td><h6>$ {p?.product?.price}</h6></td>
                                    <td>{p.quantity}</td>
                                    <td>$ {p.quantity * p?.product?.price}</td>
                                </tr>
                                    ))
                                    ) : (
                                    <tr><td colSpan="6">There is no product.</td></tr>
                                )}
                            </tbody>
                        </table>
                    
                    {!buttonFlag ?
                        <button type="button" className="btn btn-primary btn-lg" style={{width:'100px', margin:'20px'}} onClick={()=>showOrderInfo()}>Order</button>
                        :
                        <>
                            <h5 className="card-title"><i>Proceed To Checkout</i></h5>


                            <table className="table">
                                <thead className="table-info">
                                    <tr>
                                    <th scope="col"># Title</th>
                                    <th scope="col"># Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <th scope="col">+ Total Items</th>
                                    <th scope="col">{totalItems}</th>
                                    </tr>
                                    <tr>
                                    <th scope="row">+ Total Quantity</th>
                                    <td>{totalQuantity}</td>
                                    </tr>
                                    <tr>
                                    <th scope="col">+ Total Price</th>
                                    <th scope="col">$ {totalPrice}</th>
                                    </tr>
                                    <tr>
                                    <th scope="col">+ recipent</th>
                                    <th scope="col">
                                    {!nameFlag ?
                                            <>
                                                <h6>{userInfo.firstName+" "+userInfo.lastName}</h6>
                                                <button type="button" className="btn btn-secondary" style={{margin: '0px'}} onClick={nameChange} >Change Name</button>
                                            </> 
                                            :
                                                <input type="newName" className="form-control" id="newName" name="newName" placeholder="Enter New Name" value={orderData.newName} onChange={handleChange}   required/>
                                    }
                                    </th>
                                    </tr>
                                    <tr>
                                    <th scope="col">+ contact number</th>
                                    <th scope="col">
                                    {!phoneFlag ?
                                            <>
                                                <h6>{userInfo.phone}</h6>
                                                <button type="button" className="btn btn-secondary" style={{margin: '0px'}} onClick={phoneChange} >Change phone Number</button>
                                            </> 
                                            :
                                                <input type="newPhone" className="form-control" id="newPhone" name="newPhone" placeholder="Enter New Phone number" value={orderData.newPhone} onChange={handleChange}   required/>
                                    }
                                    </th>
                                    </tr>
                                    <tr>
                                    <th scope="row">+ Address</th>
                                    <td>
                                    {!addressFlag ?
                                            <>
                                                <h6>{userInfo?.address}</h6>
                                                <button type="button" className="btn btn-secondary" style={{margin: '0px'}} onClick={addressChange} >Change Address</button>
                                            </> 
                                            :
                                                <input type="newAddress" className="form-control" id="newAddress" name="newAddress" placeholder="Enter the Address" value={orderData.newAddress} onChange={handleChange}   required/>
                                    }
                                    </td>
                                    </tr>
                                    <tr>
                                    <th scope="row">+ Payment</th>
                                    <td>
                                        <select ref={selectRef} className="form-select" name="paymentMethod" value={orderData.paymentMethod} onChange={handleChange} aria-label="Default select example" style={{width: '250px'}}>
                                            <option value="0">Choose payment Method</option>
                                        {paymentMethod && paymentMethod.map(p=>(
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        ))}
                                        </select>
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
                            {alert &&
                                <div id="notification" className={`alert warning ${fadeOut ? 'fade-out' : ''}`} onClick={handleClose}>
                                    <span className="closebtn">&times;</span>  
                                    <strong>Warning!</strong> {alert}
                                </div>
                            }
                            <div>
                                <button type="button" className="btn btn-primary btn-lg" style={{width:'250px', margin:'20px'}} onClick={placeOrder}>Pay & Place My Order</button>
                                <button type="button" className="btn btn-primary btn-lg" style={{width:'200px', margin:'20px'}} onClick={cancel}>Cancel My Order</button>
                            </div>
                        </>                        

                    }
                            
                    </div>
                </div>
            </div>
        </>
    );
}