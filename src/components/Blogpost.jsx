import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Navbar2 } from './Navbar2';
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

export function Blogpost({ bloglist }) {
  const { slug } = useParams();
  const blog = bloglist.find((post) => post.slug === slug);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [synth] = useState(window.speechSynthesis);
  const [utterance] = useState(new SpeechSynthesisUtterance());

  if (!blog) {
    return <p>Blog not found</p>;
  }

  const url = process.env.NODE_ENV === 'production' ? "https://sharpmoney-backend.onrender.com" : "http://localhost:3002";

  const santizedcontent = DOMPurify.sanitize(blog.content);
  const postUrl = `https://www.sharpmoney.co.in/blog/${blog.slug}`; // Update this to your actual front-end URL

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(postUrl)}`;
  

  const handleListen = () => {
    
    if (isSpeaking) {
      // Stop the speech if it's currently playing
      synth.cancel();
      setIsSpeaking(false);
  }else if (blog.content) {
      // Play the speech
      utterance.text = blog.content;
      // Speak the content
      synth.speak(utterance);
      setIsSpeaking(true);
  
      utterance.onend = () => {
        console.log("Speech synthesis finished.");
        // Reset speechSynthesis in case of browser quirks
        synth.cancel();
        setIsSpeaking(false);
      };

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event.error);
        setIsSpeaking(false);
      };
    }
  };
  
  
  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '300px',
    objectFit: 'cover',
    width: 'auto',
    height: 'auto'
};

const iconStyle = {
    fontSize: '24px',
    margin: '5px 10px',
    color: '#0d3b66'
  };

  return (
    <div>
    {/* <Navbar2/> */}
    <div className='blogpost-container'>

 
      
    {/* {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} style={imageStyle}/>}<br></br>
    <p>Listen to this blog:</p>
    <button className={`audio-button ${isSpeaking ? 'audio-on' : 'audio-off'}`} onClick={handleListen}>
    <i className={`fas ${isSpeaking ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
            </button>
   

    <div className="share-icons">
          <p>share</p>
          <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
            <FaLinkedin style={iconStyle} />
          </a>
          <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp style={iconStyle} />
          </a>
        </div> */}


{blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} style={imageStyle} />}
    
    <div className="blogpost-actions">
        <div className="share-icons">
            <p>Share it on:</p>
            <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
                <FaLinkedin style={iconStyle} />
            </a>
            <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp style={iconStyle} />
            </a>
        </div>
        
        <div className="audio-control">
            <p>Listen to this blog:</p>
            <button className={`audio-button ${isSpeaking ? 'audio-on' : 'audio-off'}`} onClick={handleListen}>
                <i className={`fas ${isSpeaking ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
            </button>
        </div>
    </div>

      <h1>{blog.title}</h1>
      <p><i>Published on: {blog.date}</i></p>
      <p><b>Tags:</b> {blog.tagsblogs}</p>
      <div dangerouslySetInnerHTML={{__html: santizedcontent}}/>
      <div className="share-icons">
          <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
            <FaLinkedin style={iconStyle} />
          </a>
          <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp style={iconStyle} />
          </a>
        </div>
      {/* <p>{blog.content}</p> */}
    </div>
    </div>
  );
}