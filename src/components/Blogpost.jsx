import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Navbar2 } from './Navbar2';
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export function Blogpost({ bloglist }) {
  const { slug } = useParams();
  const blog = bloglist.find((post) => post.slug === slug);

  if (!blog) {
    return <p>Blog not found</p>;
  }

  const url = process.env.NODE_ENV === 'production' ? "https://sharpmoney-backend.onrender.com" : "http://localhost:3002";

  const santizedcontent = DOMPurify.sanitize(blog.content);
  const postUrl = `https://www.sharpmoney.co.in//blog/${blog.slug}`; // Update this to your actual front-end URL

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(postUrl)}`;


  
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
    <Navbar2/>
    <div className='blogpost-container'>
    {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} style={imageStyle}/>}<br></br>
    <div className="share-icons">
          <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
            <FaLinkedin style={iconStyle} />
          </a>
          <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp style={iconStyle} />
          </a>
        </div>
        
      <h1>{blog.title}</h1>
      <p><i>Published on: {blog.date}</i></p>
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