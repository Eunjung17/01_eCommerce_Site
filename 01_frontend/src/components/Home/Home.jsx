import { Link } from 'react-router-dom';
import './Home.css';
import { useNavigate } from "react-router-dom";

export default function Navigation({token, setToken}) {

    const navigate = useNavigate();

    return(
    <>
        <div className="row">
        
            <div className="leftcolumn">
                <div className="accordion0"><h3>Category</h3></div>
                <div className="panel">
                <p>Lorem ipsum...</p>
                </div>
                <button className="accordion">Section 1</button>
                <div className="panel">
                <p>Lorem ipsum...</p>
                </div>

                <button className="accordion">Section 2</button>
                <div className="panel">
                <p>Lorem ipsum...</p>
                </div>

                <button className="accordion">Section 3</button>
                <div className="panel">
                <p>Lorem ipsum...</p>
                </div>

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