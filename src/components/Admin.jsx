import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Managepost } from "./Managepost";
import { Createpost } from "./Createpost";
import { Navbar2 } from "./Navbar2";
import { NavbarAdmin } from "./NavbarAdmin";


export function Admin({bloglist}){
    
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
        <div>
            {/* <NavbarAdmin/> */}
            <Navbar2/>
            <Sidebar 
                onCreatepost = {handlecreatepost}
                onManagepost = {handlemanagepost}
                />
                {renderComponent()}
        </div>
    )
}