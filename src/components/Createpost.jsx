import { useState } from "react"
import slugify from "slugify"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function Createpost(){
    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const[image, setImage] = useState(null);
    const[tags, setTags] = useState("");

    const url = process.env.NODE_ENV === 'production' ? "https://sharpmoney-backend.onrender.com" : "http://localhost:3002";

    const slug = slugify(title)

    const handleFileChange = (e) =>{
        setImage(e.target.files[0]);
    }

    const handlepublish = function(){
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("slug", slug);
        formData.append("image", image);
        formData.append("tags",tags);

        fetch(url+"/create",{
            method: "POST",
            body: formData,
        })
        .then(async function(res){
            const json = res.json();
            alert("Published");
        })
        .catch(error => {
            console.error('Error publishing post:', error);
            alert("Failed to publish the post");
          });
    }

    return(
        <div className="create-post">
            <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            />
            <input type="text" placeholder="title" className="title-input" onChange={(e)=>{
                const value = e.target.value;
                setTitle(value);
            }}></input>

            <input type="text" placeholder="tags comma separated please" className="title-input" onChange={(e)=>{
                const value = e.target.value;
                setTags(value);
            }}></input> 

                <ReactQuill
                        value={content}
                        onChange={setContent}
                        placeholder="Content"
                        className="content-input"
                    />

            <button className="publish-button"onClick={handlepublish}>Publish</button>
        </div>
    )
}