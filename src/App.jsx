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
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [taglist, setTaglist] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  const url = process.env.NODE_ENV === 'production' ? "https://sharpmoney-backend.onrender.com" : "http://localhost:3002";
 
  useEffect(()=>{
    fetch(url)
    .then(async function(res){
      const json = await res.json();
      setBloglist(json.list);
      setTaglist(json.tags)
    })
  }, [])

  const handleSearchChange = function(e){
    setSearchQuery(e.target.value);
    const filtered = bloglist.filter(item=>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBlogs(filtered);
}

const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
};

useEffect(() => {
  // Load theme from local storage or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
  document.documentElement.setAttribute('data-theme', savedTheme);
}, []);

useEffect(() => {
  // Save theme to local storage whenever it changes
  localStorage.setItem('theme', theme);
}, [theme]);

const handleTagClick = (tag) => {
  if (tag === null) {
      setFilteredBlogs([]); // Reset to the full blog list
  } else if (filteredBlogs.length > 0 && filteredBlogs.some(blog => blog.tags.includes(tag))) {
      setFilteredBlogs([]); // Deselect the tag and reset to the full blog list
  } else {
      const filtered = bloglist.filter(blog => blog.tags.includes(tag));
      setFilteredBlogs(filtered);
  }
};

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
    {/* <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button> */}
      {/* Your existing components go here */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
    
      <Routes>        
        <Route path="/" element={<Bloglist bloglist={bloglist} filteredBlogs={filteredBlogs} searchQuery={searchQuery} onSearchChange={handleSearchChange} taglist={taglist} onTagClick = {handleTagClick}/>} />
        <Route path="/blog/:slug" element={<Blogpost bloglist={bloglist} />} />
        <Route path="/adminlogin" element={<Adminlogin onLogin={handlelogin}/>}/>
        <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Admin bloglist={bloglist} />} />} />
      </Routes>
    </>
  )
}

export default App
