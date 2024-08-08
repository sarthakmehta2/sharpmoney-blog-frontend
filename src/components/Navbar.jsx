import { Link } from 'react-router-dom';
// import sharpmoneylogo_1 from "../assets/sharpmoneylogo_1"
import logo from "../assets/sharpmoneylogo_1.png"
import { FaLinkedin, FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';

export function Navbar() {

    
  const linkedinShareUrl = `https://www.linkedin.com/company/sharpmoney/`;
  const whatsappShareUrl = `https://api.whatsapp.com/`;
  const FacebookShareUrl = `https://www.facebook.com/profile.php?id=61562868398852`;
  const InstagramShareUrl = `https://www.instagram.com/sharpmoney.co.in?igsh=ZXpvcjBvdXA3eWQx`;

    const iconStyle = {
        fontSize: '24px',
        margin: '5px 10px',
        color: '#0d3b66'
      };

  return (
    <div className="navbar">
      <div className="navbar-left" style={{marginBottom: 0+'px'}}>
        
        <Link to="/"><img src={logo} alt="Logo" className="logo" style={{paddingRight: 0+'px'}} /></Link>
        
        <span className="company-name">Sharpmoney Blogs</span>
      </div>

      <div className='navbar-right' style={{marginTop: 0+'px'}}>
      <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
            <FaLinkedin style={iconStyle} /></a>
      <a href={FacebookShareUrl} target="_blank" rel="noopener noreferrer">
            <FaFacebook style={iconStyle} /></a>
      <a href={InstagramShareUrl} target="_blank" rel="noopener noreferrer">
            <FaInstagram style={iconStyle} /></a>
         
      </div>
    </div>
  );
}
