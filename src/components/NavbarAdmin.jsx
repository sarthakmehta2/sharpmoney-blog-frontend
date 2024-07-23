import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Managepost } from "./Managepost";
import { Createpost } from "./Createpost";

import { Link } from 'react-router-dom';
// import sharpmoneylogo_1 from "../assets/sharpmoneylogo_1"
import logo from "../assets/sharpmoneylogo_1.png"

export function NavbarAdmin(){
    
    const [selectedComponent, setSelectedComponent] = useState("");

    const handlecreatepost = () => {
        setSelectedComponent('createpost');  
    }

    const handlemanagepost = () =>{
        setSelectedComponent('managepost'); 
    }

    const renderComponent = () => {
        switch(selectedComponent){
            case 'createpost':
                return <Createpost />
            case 'managepost':
                return <Managepost bloglist={bloglist}/>              
        }
    }

    return(
        <div className="navbar">
          <div className="navbar-left">
            
            <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>
            
            <span className="company-name">Sharpmoney Blogs</span>
          </div>
          <Sidebar 
                onCreatepost = {handlecreatepost}
                onManagepost = {handlemanagepost}
                />
                {renderComponent()}
        </div>


    )
}