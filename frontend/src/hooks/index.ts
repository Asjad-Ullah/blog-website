import { useState, useEffect } from "react";
import axios from "axios";

export interface Blogs {
    "title": string,
    "content": string,
    "id": string,
    "author": {
        "name": string
    }
}

export function useBlogs() {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    
    useEffect(() => {
        axios.get("https://backend.moeezasjad.workers.dev/api/v1/blog/bulk", {
            headers: {
                Authorization: localStorage.getItem("jwt")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
        })
    },[])

    return {loading, blogs};
}

export function useBlog({ id }: { id: string }) {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blogs>();
    
    useEffect(() => {
        axios.get(`https://backend.moeezasjad.workers.dev/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("jwt")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
        })
    },[id])

    return {loading, blog};
}