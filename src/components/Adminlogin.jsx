import { useState } from "react"
import { useNavigate } from 'react-router-dom';

export function Adminlogin({onLogin}){
    const navigate = useNavigate();
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const handlesubmit= function(e){
        onLogin(e, username, password);
    }
    
    return(
        <div>
            
            <div className="admin-login-container">
            <form className="admin-login-form" onSubmit={handlesubmit}>
            <h2>Admin Login</h2>
                <input
                type="text"
                placeholder="username"
                value = {username}
                onChange={(e)=>setUsername(e.target.value)}/>

                <input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>

                <button type="submit">Log In</button>
            </form>
            </div>
        </div>
    )
}