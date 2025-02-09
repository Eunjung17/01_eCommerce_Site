import { Link } from 'react-router-dom';
import './Navigation.css';
import { useNavigate } from "react-router-dom";

export default function Navigation({token, setToken}) {

    const navigate = useNavigate();

    const logOut = async () => {
        await setToken(null);
        
        setTimeout(function(){
            navigate("/");
        },1000);
    }

    return(
    <>
    <div className="top">
    <div className="header">
        <h1>E-Commerce Market</h1>
        <p>Resize the browser window to see the effect.</p>
        </div>

        <div className="topnav">
        <Link to="/">Home</Link>
        <Link to="/">About us</Link>

        { !token ? 
        <>
            <Link to="/SignIn" style={{float:'right'}}>Sign in  </Link>
            <Link to="/Registration" style={{float:'right'}}>Register</Link>
        </> 
            : 
        <>
            <Link to="/" style={{float:'right'}}>Order History</Link>
            <Link to="/" style={{float:'right'}}>User Profile</Link>
            <Link to="/" style={{float:'right'}}>Log Out</Link>
        </>
        }
        </div>
    </div>
    </>
    );
}