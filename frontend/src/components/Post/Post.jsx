import {useEffect, useRef, useState} from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    IconButton,
    Avatar,
    Collapse,
    Typography,
    Box, Link,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from '@mui/icons-material/Comment';
import {Link as RouterLink} from "react-router-dom";
import Comment from "../Comment/Comment.jsx"
import axios from "axios";
import CommentForm from "../Comment/CommentForm.jsx";

function Post({ title, text, userName, userId,postId,likes}) {
    const [expanded, setExpanded] = useState(false);
    const [isLiked, setIsLiked] = useState(false)
    const [commentList, setCommentList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const isInitialMount = useRef(true);
    const [likeCount, setLikeCount] = useState(likes.length)
    const [likeId, setLikeId] = useState(null);



    const refreshComments = () =>{
        axios.get("http://localhost:8080/comments?postId="+postId, {
            auth: { username: "admin", password: "123" }
        })
            .then(response => {
                setIsLoaded(true);
                setCommentList(response.data);
            })
            .catch((err) => {
                setError(err);
            });
    }

    const saveLikeToDatabase = async () =>{
        try {
            const response = await axios.post("http://localhost:8080/likes",{
                userId:userId,
                postId: postId
            });
            console.log(response)
            setLikeId(response.data.id);
        }catch (error) {
            console.error("Error of Sending:", error);
        }
    }

    const deleteLikeFromDatabase = async () =>{
        try {
            await axios.delete("http://localhost:8080/likes/"+likeId)
            setLikeId(null);
        }catch (error) {
            console.error("Error of Sending:", error);
        }
    }


    useEffect(() => {
        if(isInitialMount.current){
            isInitialMount.current = false;
        }else{
            refreshComments()
        }
    }, [commentList]);

    useEffect(() =>{checkLikes()},[])

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
    };

    const handleLike = () =>{
        setIsLiked(!isLiked);
        if(!isLiked){
            setLikeCount(likeCount+1);
            saveLikeToDatabase();
        }else{
            setLikeCount(likeCount-1);
            deleteLikeFromDatabase();
        }
    }

    const checkLikes = () =>{
        let likeControl = likes.find(like => like.userId === userId);
        if(likeControl){
            setIsLiked(true);
            setLikeId(likeControl.id);
        }
    }



    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2,
        }} >
            <Card  sx={{
                width: {
                    xs: "100%",
                    sm: "90%",
                    md: "70%",
                    lg: 800,
                },
                margin: "0 auto",


            }}>
                <CardHeader
                    avatar={
                    <Link component={RouterLink}
                          to={`/users/${userId}`}
                          underline="none"
                          sx={{ color: "white" }}>
                        <Avatar
                            sx={{
                                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                            }}
                            aria-label="recipe"
                        >
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                    }

                    title={title}
                />

                <CardContent>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {text}
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>
                    <IconButton onClick={handleLike} aria-label="add to favorites">
                        <FavoriteIcon sx={isLiked ? {color:'red'} : null} />
                    </IconButton>
                    {likeCount}

                    <IconButton
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        sx={{
                            marginLeft: "auto",
                        }}
                    >
                        <CommentIcon />
                    </IconButton>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Box  sx={{ bgcolor: '#F5F5F5', color:'#292929'}} >
                        {error ? "error" : isLoaded ? commentList.map(comment => (
                            <Comment userId = {1} userName = {"USER"} text = {comment.text}/>
                        )) : "Loading"}
                        <CommentForm userId = {1} userName = {"USER"} postId = {postId} />
                    </Box>
                </Collapse>
            </Card>
        </Box>
    );
}

export default Post;
