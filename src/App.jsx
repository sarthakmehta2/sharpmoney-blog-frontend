import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Bloglist } from './components/Bloglist'
import { Admin } from './components/Admin'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Blogpost } from './components/Blogpost'
import { Adminlogin } from './components/Adminlogin'
import {ProtectedRoute} from './components/ProtectedRoute'
import { Navbar } from './components/Navbar'


function App() {
  const[bloglist, setBloglist] = useState([]);
  const [isAuthenticated, setIsauthenticated] = useState(false);
  const navigate = useNavigate();

  // const url = "http://localhost:3002";
  // const url = "https://sharpmoney-backend.onrender.com";
  const url = process.env.NODE_ENV === 'production' ? "https://sharpmoney-backend.onrender.com" : "http://localhost:3002";
 
  useEffect(()=>{
    fetch(url)
    .then(async function(res){
      const json = await res.json();
      setBloglist(json.list);
    })
  }, [])

  

    const handlelogin = async function(e, username, password){
        e.preventDefault();
        try{
            const response = fetch(url+"/adminlogin",{
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers:{
                    "content-type": "application/json"
                },
            })
            .then(async function(res){
                const json = await res.json();
                console.log(json);
                if(json.success){
                    setIsauthenticated(true);
                    navigate("/admin");
                }
                else{
                    setIsauthenticated(false);
                    alert("Invalid Credentials!");
                }
            })
        }catch(error){
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
        }
    }


  

  return (
    <>
   
      <Routes>
        
        <Route path="/" element={<Bloglist bloglist={bloglist} />} />
        <Route path="/blog/:slug" element={<Blogpost bloglist={bloglist} />} />
        <Route path="/adminlogin" element={<Adminlogin onLogin={handlelogin}/>}/>
        <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Admin bloglist={bloglist} />} />} />
      </Routes>
 

  

    </>
  )
}

export default App
