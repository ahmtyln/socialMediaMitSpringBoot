import { AppBar, Toolbar, IconButton, Typography, Button, Box, Link } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useParams } from "react-router-dom";

function Navbar(){
    const {userId} = useParams();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
                        <Link
                            component={RouterLink}
                            to="/"
                            underline="none"
                            sx={{ color: "white"}}
                        >
                            HOME
                        </Link>
                    </Typography>
                    <Button color="inherit">Login</Button>
                    <Link
                        component={RouterLink}
                        to={`/users/${userId}`}
                        underline="none"
                        sx={{ color: "white", ml: 2 }}
                    >
                        USER
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;