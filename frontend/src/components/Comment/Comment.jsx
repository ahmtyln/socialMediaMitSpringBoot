import React from "react";
import {Avatar, Box, CardContent, InputAdornment, Link, OutlinedInput} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

function Comment({text,userId,userName}){

    return(
        <Box>
            <OutlinedInput
                id="comment-input"
                disabled
                multiline
                value={text}
                inputProps= {{maxLength:25}}
                fullWidth
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
                }>
            </OutlinedInput>
        </Box>
    )
}

export default Comment;