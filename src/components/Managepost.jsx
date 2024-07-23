import { useState } from "react";

export function Managepost({bloglist}){
    let i=0;
    console.log(bloglist);

    const url = process.env.NODE_ENV === 'production' ? "https://sharpmoney-backend.onrender.com" : "http://localhost:3002";

    const handledelete = function(id){
        console.log(id);
        fetch(url+"/deletepost",{
            method: "PUT",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id
            })
        })
        .then(async function(res){
            const json = res.json();
            alert("Post Deleted");
        })
        .catch(error=>{
            console.error("Error deleting the post: ", error);
            alert("Error deleting the post");
        });


    }
    return(
        <div>
            <table id="manageposttable">
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Date Published</th>
                        <th>Title</th>
                        <th>Delete?</th>
                        <th>Edit?</th>
                    </tr>
                </thead>
                <tbody>
                    {bloglist.map(function(list){
                        i=i+1;
                        return(
                            <tr>
                                <td>{i}</td>
                                <td>{list.createdAt}</td>
                                <td>{list.title}</td>
                                <td>Edit</td>
                                <td ><button onClick={()=>handledelete(list._id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}