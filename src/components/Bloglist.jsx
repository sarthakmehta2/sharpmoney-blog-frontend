import { Adminlogin } from "./Adminlogin";
import { Blogpost } from "./Blogpost";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Navbar } from "./Navbar";
import { useState, useEffect } from "react";

export function Bloglist({bloglist, filteredBlogs, searchQuery, onSearchChange, taglist, onTagClick}){
    const [selectedTag, setSelectedTag] = useState(null);
    

    const finallist = filteredBlogs.length > 0 ? filteredBlogs : bloglist;
    const navigate = useNavigate();


    const url = process.env.NODE_ENV === 'production' ? "https://sharpmoney-backend.onrender.com" : "http://localhost:3002";
    
    const trimcontent2 = (content) =>{
        const strippedContent = content.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
        return strippedContent.length > 120 ? strippedContent.slice(0, 120) + '....' : strippedContent;
    }

    const handlelogin = function(){
        navigate('/adminlogin');   
    }

    const handleClearFilters = () => {
        onTagClick(null); // Passing null will reset the filteredBlogs to the full blog list.
    };

    const handleTagClick = (tag) => {
        setSelectedTag(selectedTag === tag ? null : tag); // Toggle selected tag
        onTagClick(selectedTag === tag ? null : tag); // Call App's handleTagClick with the correct value
    };


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
            <input
          id='searchbar'
          type='text'
          placeholder='Search blog title...'
          value={searchQuery}
          onChange={onSearchChange}
          style={{ margin: '20px', padding: '10px', width: '80%', textAlign: 'center' }}>

          </input>

          <div className="tags-list">
                {taglist.map(tag => (
                    <span key={tag} onClick={() => handleTagClick(tag)} className={`tag ${selectedTag === tag ? 'selected' : ''}`}>
                        {tag}
                    </span>
                ))}
            </div>

            {filteredBlogs.length > 0 && (
                <button onClick={handleClearFilters} style={{ margin: '20px', padding: '10px' }}>
                    Clear Filters
                </button>
            )}

            <div className="blog-grid">

            {finallist.map(function(list){
                return <div className="blog-card" key={list.slug}>
                    <Link to={`/blog/${list.slug}`}>
                      {list.imageUrl && <img src={list.imageUrl} alt={list.title} style={imageStyle}/>}
                    <h2>{list.title}</h2>
                    <h3>{trimcontent2(list.content)}</h3>
                    <p>Published on: {list.date}</p>  
                    <p>Tags: {list.tagsblogs}</p>      
                    </Link>

                    </div>
                    
            })}
            </div>
        </div>
    )
}