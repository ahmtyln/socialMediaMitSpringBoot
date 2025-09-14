import { useState } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    IconButton,
    Avatar,
    Collapse,
    Typography,
    Box, Link, OutlinedInput, Button,
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import axios from "axios";

function PostForm({ userName, userId }) {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");


    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:8080/posts",{
                title:title,
                text:text,
                userId: userId
            })
            console.log("POST response status:", response.status);
            console.log("Backend cevabı:", response.data);
            alert("Başarıyla gönderildi!");
        }catch (error) {
            console.error("Gönderim hatası:", error);
        }

    };

    const handleTitle = (value) =>{
        setTitle(value)
    }

    const handleText = (value) =>{
        setText(value)
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

                    title= {<OutlinedInput
                        id="title-input"
                        multiline
                        placeholder="Title"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        onChange={(i) => handleTitle(i.target.value)}
                    />
                    }
                />

                <CardContent>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        <OutlinedInput
                        id="text-input"
                        multiline
                        placeholder="Text"
                        inputProps= {{maxLength:250}}
                        fullWidth
                        onChange={(i) => handleText(i.target.value)}
                        endAdornment={
                            <inputAdornment position ="end">
                                <Button onClick={handleSubmit} variant={"contained"} sx={{background:"linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)",color:"white"}} >POST</Button>
                            </inputAdornment>
                        }

                    />
                    </Typography>
                </CardContent>

            </Card>
        </Box>
    );
}

export default PostForm;
