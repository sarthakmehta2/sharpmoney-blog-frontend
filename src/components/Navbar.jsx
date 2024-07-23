import { Link } from 'react-router-dom';
// import sharpmoneylogo_1 from "../assets/sharpmoneylogo_1"
import logo from "../assets/sharpmoneylogo_1.png"
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export function Navbar() {

    
  const linkedinShareUrl = `https://www.linkedin.com/sharpmoney`;
  const whatsappShareUrl = `https://api.whatsapp.com/`;

    const iconStyle = {
        fontSize: '24px',
        margin: '5px 10px',
        color: '#0d3b66'
      };

  return (
    <div className="navbar">
      <div className="navbar-left">
        
        <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>
        
        <span className="company-name">Sharpmoney Blogs</span>
      </div>

      <div className='navbar-right'>
      <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
            <FaLinkedin style={iconStyle} /></a>
            <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp style={iconStyle} />
          </a>
      </div>
    </div>
  );
}
