    import { Link, useNavigate } from "react-router-dom";
    import { useState } from "react";
    import './Registration.css';

    export default function Registration({token, setToken}) {

        const navigate = useNavigate();
        const [businessOwner, setBusinessOwner] = useState(null);

        const handleRadioChange = (e) => {
            console.log(e.target.id);
            if(e.target.id ==='flexRadioDefault2') setBusinessOwner("business"); 
            else setBusinessOwner(null); 
        }

        return(
        <>
            <div className="registration-form-whole">
                <div className="registration-form">
                    <div className="form-header">
                        <h2>Create Your Account</h2>
                        <p>Sign up to get started!</p>
                    </div>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" placeholder="Enter your username" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter your email" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <div className="name">
                                <input type="firstName" className="form-control" id="firstName" placeholder="First Name" required/>
                                <input type="lastName" className="form-control" id="lastName" placeholder="Last Name" required/>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Create a password" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirm-password" placeholder="Confirm your password" required/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="address" className="form-control" id="address" placeholder="Enter your address" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="phone" className="form-control" id="phone" placeholder="Enter your phone number" required/>
                        </div>
                        <div className="user-type">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={handleRadioChange} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Individual
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={handleRadioChange}/>
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Business Owner
                                </label>
                            </div>
                        </div>
                        {businessOwner && 
                        <>
                            <div className="mb-3">
                                <label htmlFor="taxId" className="form-label">Tax ID</label>
                                <input type="taxId" className="form-control" id="taxId" placeholder="Enter your Tax ID" required/>
                            </div>
                        </>
                        }

                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="terms" required/>
                            <label className="form-check-label" htmlFor="terms">I agree to the <a href="#" className="text-primary">terms and conditions</a></label>
                        </div>
                        <button type="submit" className="btn btn-custom w-100">Register</button>
                    </form>
                    <div className="text-muted">
                        Already have an account? <Link to="/SignIn">Sign in  </Link>
                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
                </div>
            </div>
        </>
        );
    }