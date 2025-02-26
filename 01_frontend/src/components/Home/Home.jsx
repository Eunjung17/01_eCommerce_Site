import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { useEffect, useState } from "react";
import { useGetCategoryAllQuery } from '../../redux/slices/categorySlice'
import { useGetTop4ProductQuery } from '../../redux/slices/productSlice'
import { useAddCartMutation } from '../../redux/slices/cartSlice'


export default function Navigation({token, setToken, userRole ,setUserRole}) {

    const navigate = useNavigate();
    const { data: categories, isLoading, error } = useGetCategoryAllQuery(token);
    const { data: top4Products, isLoading2, error2} = useGetTop4ProductQuery(token);
    const [ addCartApi, {isLoading3, error3}] = useAddCartMutation();

    const [ alert, setAlert ] = useState(null);

    console.log(top4Products);
    console.log("userRole typeof:" ,typeof(userRole));
    
    const [activeIndex, setActiveIndex] = useState(null); 

    // Toggle the panel based on the index
    const togglePanel = (index) => {
        setAlert(null);
        setActiveIndex(activeIndex === index ? null : index); // Close if already open, open if closed
    };

    const cart = async (productId, quantity) => {
        console.log("productId: " ,productId);
        console.log("quantity: " ,quantity);

        setAlert(null);

        if(!token && !userRole){
           setAlert("Login required."); 
        }else{
            if(userRole === '2') setAlert("Business user can't order products."); 
            else if(userRole === '3') setAlert("Admin user can't order products."); 
            else{

                console.log("again:" , token, " ",productId," ", quantity);
                const response = await addCartApi({token, productId, quantity}).unwrap(); 

                console.log("addCartApi response:" ,response);

                navigate("/UserCart");
            }
        }
    }

    const order  = () => {

        setAlert(null);
        if(!token ||!userRole) setAlert("Login required.");
        else navigate("/");
    }

    if (isLoading || isLoading2 || isLoading3) return <div>Loading categories...</div>;
    if (error || error2 || error3) return <div>Error loading categories</div>;

    return(
    <>
        <div className="row">
            <div className="leftcolumn">
                <div className="accordion0"><h3>Category</h3></div>
            {categories && categories.map(category => (            
                <div key={category.id} >
                    <button className="accordion" onClick={()=>togglePanel(`index${category.id}`)}>
                        {category.name}
                    </button>
                    {category && category.categoryDetail.map(detail => (
                        <div key={detail.id} className="panel" style={{display:activeIndex === `index${category.id}` ? 'block': 'none'}} >
                            <p>{detail.name}</p>
                        </div>
                    ))}
    
                </div>
                ))}
            </div>

            <div className="middlecolumn">
                <div className="card">
                <h3>Popular Post</h3>
            {top4Products && top4Products.length > 0 &&
                <>
                <h2>{top4Products[0].name}</h2>
                <div className="fakeimg" style={{height:'220px', display:'flex'}}>
                    <img className = "bookCoverSize" src={top4Products[0].images} alt={top4Products[0].id} />
                    <div>
                        <p>{top4Products[0].description}</p>
                        <h5>${top4Products[0].price}</h5>
                        <button type="button" className="btn btn-secondary" style={{margin: '5px'}}>Detail</button>
                        <button className="btn btn-success" type="submit" style={{margin: '5px'}} onClick={()=>cart(top4Products[0].id, 1)}>Cart</button>
                        <button className="btn btn-primary" type="submit" style={{margin: '5px'}} onClick={order}>Order</button>
                        {alert && 
                            <p>{alert}</p>
                        }
                    </div>
                </div>
                </>
            }
                </div>
                <div className="card">
                <h3>Popular Post</h3>
                {top4Products && top4Products.length > 1 &&
                <>
                <h2>{top4Products[1].name}</h2>
                <div className="fakeimg" style={{height:'220px', display:'flex'}}>
                    <img className = "bookCoverSize" src={top4Products[1].images} alt={top4Products[1].id} />
                    <div>
                        <p>{top4Products[1].description}</p>
                        <h5>${top4Products[1].price}</h5>
                        <button type="button" className="btn btn-secondary" style={{margin: '5px'}}>Detail</button>
                        <button className="btn btn-success" type="submit" style={{margin: '5px'}} onClick={()=>cart(top4Products[1].id, 1)}>Cart</button>
                        <button className="btn btn-primary" type="submit" style={{margin: '5px'}}>Order</button>
                    </div>
                </div>
                </>
            }</div>
            </div>
            <div className="rightcolumn">
                <div className="card">
                    <div style={{display:'flex',float:'right',margin:'20px'}}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{ marginRight: '10px' }} />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </div>
                </div>
                <div className="card">
                <h3>Popular Post</h3>
                {top4Products && top4Products.length > 2 &&
                <>
                <h2>{top4Products[2].name}</h2>
                <div className="fakeimg" style={{height:'200px', display:'flex'}}>
                    <img className = "bookCoverSize" src={top4Products[2].images} alt={top4Products[2].id} />
                    <div>
                        <p>{top4Products[2].description}</p>
                        <h5>${top4Products[2].price}</h5>
                        <button type="button" className="btn btn-secondary" style={{margin: '5px'}}>Detail</button>
                        <button className="btn btn-success" type="submit" style={{margin: '5px'}} onClick={()=>cart(top4Products[2].id, 1)}>Cart</button>
                        <button className="btn btn-primary" type="submit" style={{margin: '5px'}}>Order</button>
                    </div>
                </div>
                </>
                }
                </div>
                <div className="card">
                <h3>Popular Post</h3>
                {top4Products && top4Products.length > 3 &&
                <>
                <h2>{top4Products[3].name}</h2>
                <div className="fakeimg" style={{height:'200px', display:'flex'}}>
                    <img className = "bookCoverSize" src={top4Products[3].images} alt={top4Products[3].id} />
                    <div>
                        <p>{top4Products[3].description}</p>
                        <h5>${top4Products[3].price}</h5>
                        <button type="button" className="btn btn-secondary" style={{margin: '5px'}}>Detail</button>
                        <button className="btn btn-success" type="submit" style={{margin: '5px'}} onClick={()=>cart(top4Products[3].id, 1)}>Cart</button>
                        <button className="btn btn-primary" type="submit" style={{margin: '5px'}}>Order</button>
                    </div>
                </div>
                </>
                }
                </div>
            </div>
        </div>
    </>
    );
}