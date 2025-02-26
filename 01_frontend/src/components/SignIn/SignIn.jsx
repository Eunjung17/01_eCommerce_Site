import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoginUserMutation } from '../../redux/slices/userSlice'
import './SignIn.css';

export default function SignIn({token, setToken, userRole, setUserRole}) {

    const navigate = useNavigate();
    const [loginUserApi, {isLoading, error}] = useLoginUserMutation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const userLogin = async (event) => {
        event.preventDefault();
     
         try {
           
            if(formData.email && formData.password){

             const response = await loginUserApi(formData).unwrap();

             if(response.token){ //login try, and then get token
               setToken(response.token);
               setUserRole(response?.userInformation?.userRoleId.toString());
               navigate("/");
             }
           }
           
         } catch (error) {
           console.log("error:" , error?.data?.message);
           setErrorMessage("Check your ID AND Password again.");
         }
    }

    const handleChange = (e) => {
        setErrorMessage(null);
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    
    // if (isLoading) return <div>Loading categories...</div>;


    return(
    <>
        <div className="signIn-form-whole">
            <div className="signIn-form">
                <div className="form-header">
                    <h2>Sign In</h2>
                    <p>Sign in to get started!</p>
                </div>
                <form onSubmit={userLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" className="form-control" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" autoComplete="current-id"  required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" autoComplete="current-password" required/>
                    </div>
                {errorMessage && 
                    <div>{errorMessage}</div>
                }
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