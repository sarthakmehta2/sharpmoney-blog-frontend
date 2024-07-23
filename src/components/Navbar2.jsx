import { Link } from 'react-router-dom';
// import sharpmoneylogo_1 from "../assets/sharpmoneylogo_1"
import logo from "../assets/sharpmoneylogo_1.png"

export function Navbar2() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        
        <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>
        
        <span className="company-name">Sharpmoney Blogs</span>
      </div>
    </div>
  );
}
