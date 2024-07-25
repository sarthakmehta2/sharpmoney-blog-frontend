import { Adminlogin } from "./Adminlogin";
import { Blogpost } from "./Blogpost";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Navbar } from "./Navbar";

export function Bloglist({bloglist}){
    const navigate = useNavigate();

    const url = process.env.NODE_ENV === 'production' ? "https://sharpmoney-backend.onrender.com" : "http://localhost:3002";
    
    const trimcontent2 = (content) =>{
        const strippedContent = content.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
        return strippedContent.length > 120 ? strippedContent.slice(0, 120) + '....' : strippedContent;
    }

    const handlelogin = function(){
        navigate('/adminlogin');   
    }

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '200px',
        objectFit: 'cover',
        width: 'auto',
        height: 'auto'
    };

    return(
        <div>
            <Navbar/>
            <div className="blog-grid">
            {bloglist.map(function(list){
                return <div className="blog-card" key={list.slug}>
                    <Link to={`/blog/${list.slug}`}>
                      {list.imageUrl && <img src={list.imageUrl} alt={list.title} style={imageStyle}/>}
                    <h2>{list.title}</h2>
                    <h3>{trimcontent2(list.content)}</h3>
                    <p>Published on: {list.date}</p>        
                    </Link>
                    </div>
            })}
            </div>
        </div>
    )
}