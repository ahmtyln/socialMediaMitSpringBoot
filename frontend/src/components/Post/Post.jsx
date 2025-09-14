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
    Box, Link,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import clsx from "clsx";
import {Link as RouterLink} from "react-router-dom";

function Post({ title, text, userName, userId }) {
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleLike = () =>{
        setLiked(!liked);
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
                        <FavoriteIcon sx={liked ? {color:'red'} : null} />
                    </IconButton>

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
                    <CardContent>

                    </CardContent>
                </Collapse>
            </Card>
        </Box>
    );
}

export default Post;
