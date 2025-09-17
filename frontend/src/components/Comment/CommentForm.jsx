import React, {useState} from "react";
import {Avatar, Box, Button, CardContent, InputAdornment, Link, OutlinedInput} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import axios from "axios";

function CommentForm({userId,userName,postId}){

    const[text, setText] = useState("");

    const handleSubmit = async () => {

        try {
            await axios.post("http://localhost:8080/comments",{
                postId:postId,
                text:text,
                userId: userId
            })

        }catch (error) {
            console.error("Gönderim hatası:", error);
        }

        setText("");

    };

    const handleChange = (value) =>{
        setText(value)
    }


    return(
        <Box>
            <OutlinedInput
                id="comment-input"
                multiline
                inputProps= {{maxLength:250}}
                fullWidth
                value={text}
                onChange={(i) =>handleChange(i.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Link component={RouterLink}
                              to={`/users/${userId}`}
                              underline="none"
                              sx={{ color: "white" }} >
                            <Avatar aria-label="recipe" sx={{
                                background: "#A1A1A1",
                            }}>
                                {userName.charAt(0).toUpperCase()}

                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position = "end">
                        <Button onClick={handleSubmit} variant={"contained"} sx={{background:"linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)",color:"white"}} >Comment</Button>
                    </InputAdornment>
                }
            >
            </OutlinedInput>
        </Box>
    )
}

export default CommentForm;