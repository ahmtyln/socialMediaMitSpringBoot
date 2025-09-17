import React, {useEffect, useState} from "react"
import Post from "../Post/Post.jsx";
import "./Home.scss";
import axios from "axios";
import {Box, Container} from "@mui/material";
import PostForm from "../Post/PostForm.jsx";


function Home(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    const refreshPost = () =>{
        axios.get("http://localhost:8080/posts", {
            auth: { username: "admin", password: "123" }
        })
            .then(response => {
                setIsLoaded(true);
                setPostList(response.data);
            })
            .catch((err) => {
                setIsLoaded(true);
                setError(err);
            });
    }



    useEffect(() => {
        refreshPost()
    }, [postList]);


    if(error){
        return <div> Error </div>;
    }else if(!isLoaded){
        return <div>Loading...</div>;
    }else{
        return (
            <Box sx={{ bgcolor: '#f0f5ff', height: '100vh'}} >
                <PostForm userId={1} userName={"hjbhjb"} refreshPost = {refreshPost} />
               {postList.map(post => (
                   <Post likes={post.postLikes} postId = {post.id} userId={post.userId} userName={post.userName} title = {post.title} text = {post.text} ></Post>
               ))}
            </Box>
        )
    }
}

export default Home;