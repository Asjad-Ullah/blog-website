import React from "react";
import { Header } from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BlogForm() {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const navigate = useNavigate();

    return (
        <div>
            <Header/>
            <div className="flex justify-center font-poppins">
                <div className="w-full md:w-2/3 lg:1/2 p-5">
                    <textarea  onChange={(e)=>{setTitle(e.target.value)}} rows={2} className="block p-2.5 w-full text-md text-gray-900 bg-gray-100 rounded-lg my-5 font-bold text-3xl lg:text-5xl leading-tight" placeholder="Title"></textarea>
                    <textarea onChange={(e)=>{setContent(e.target.value)}} rows={12} className="block p-2.5 w-full text-md  bg-gray-100 rounded-lg my-5 font-medium text-md lg:text-lg text-gray-600" placeholder="Write your thoughts here..."></textarea>
                    <button onClick={async () => {
                        const response = await axios.post("https://backend.moeezasjad.workers.dev/api/v1/blog", { title: title, content: content }, { headers: { Authorization: localStorage.getItem("jwt") } });
                        navigate(`/blog/${response.data.message}`);
                    }} className=" bg-black hover:opacity-75 text-white py-3 px-8 rounded-lg font-semibold">Publish</button>
                </div>
            </div>
        </div>    
    )
}