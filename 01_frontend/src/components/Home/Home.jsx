import { Link } from 'react-router-dom';
import './Home.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetCategoryAllQuery } from '../../redux/slices/categorySlice'

export default function Navigation({token, setToken}) {

    const navigate = useNavigate();
    const { data: categories, isLoading, error } = useGetCategoryAllQuery();
    console.log(categories);

    const [activeIndex, setActiveIndex] = useState(null); 

    // Toggle the panel based on the index
    const togglePanel = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Close if already open, open if closed
    };

    if (isLoading) return <div>Loading categories...</div>;
    if (error) return <div>Error loading categories</div>;

    return(
    <>
        <div className="row">
            <div className="leftcolumn">
                <div className="accordion0"><h3>Category</h3></div>
            {categories.map(category => (            
                <div key={category.id} >
                    <button className="accordion" onClick={()=>togglePanel(`index${category.id}`)}>
                        {category.name}
                    </button>
                    {category.categoryDetail.map(detail => (
                        <div key={detail.id} className="panel" style={{display:activeIndex === `index${category.id}` ? 'block': 'none'}} >
                            <p>{detail.name}</p>
                        </div>
                    ))}
    
                </div>
                ))}
            </div>

            <div className="middlecolumn">
                <div className="card">
                <h2>TITLE HEADING</h2>
                <h5>Title description, Dec 7, 2017</h5>
                <div className="fakeimg" style={{height:'200px'}}>Image</div>
                <p>Some text..</p>
                <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                </div>
                <div className="card">
                <h2>TITLE HEADING</h2>
                <h5>Title description, Sep 2, 2017</h5>
                <div className="fakeimg" style={{height:'200px'}}>Image</div>
                <p>Some text..</p>
                <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                </div>
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
                <div className="fakeimg"><p>Image</p></div>
                <div className="fakeimg"><p>Image</p></div>
                <div className="fakeimg"><p>Image</p></div>
                </div>
                <div className="card">
                <h3>Follow Me</h3>
                <p>Some text..</p>
                </div>
            </div>
        </div>

        <div className="footer">
        <h2>Footer</h2>
        </div>
    </>
    );
}