import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username && password) {
            navigate("/chat");
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h4">Login Chat</Typography>
            <TextField 
                label="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                sx={{ marginBottom: 2 }} 
            />
            <TextField 
                label="Password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                sx={{ marginBottom: 2 }} 
            />
            <Button variant="contained" onClick={handleLogin}>Login</Button>
        </Box>
    );
};

export default Login;