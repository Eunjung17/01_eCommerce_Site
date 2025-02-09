import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './SignIn.css';

export default function SignIn({token, setToken}) {

    const navigate = useNavigate();
    const [businessOwner, setBusinessOwner] = useState(null);

    const handleRadioChange = (e) => {
        console.log(e.target.id);
        if(e.target.id ==='flexRadioDefault2') setBusinessOwner("business"); 
        else setBusinessOwner(null); 
    }

    return(
    <>
        <div className="signIn-form-whole">
            <div className="signIn-form">
                <div className="form-header">
                    <h2>Sign In</h2>
                    <p>Sign in to get started!</p>
                </div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Create a password" required/>
                    </div>
                    <button type="submit" className="btn btn-custom w-100">Sign In</button>
                </form>
                <div className="text-muted">
                    Don't have an account?  <Link to="/Registration">Create an account</Link>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
            </div>
        </div>
    </>
    );
}