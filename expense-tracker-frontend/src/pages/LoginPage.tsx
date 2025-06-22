import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authService";
import { loginSuccess } from "../features/auth/authSlice";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Link,
  Paper,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await login({ email, password });
      localStorage.setItem("accessToken", response.access);
      localStorage.setItem("refreshToken", response.refresh);
      localStorage.setItem("user", JSON.stringify(response.user));
      dispatch(loginSuccess(response.user));
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <LockOutlined color="primary" sx={{ fontSize: 40, mr: 1 }} />
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <Box>
            Don't have an account?
            <Link href="/register" variant="body2">
              Sign Up
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
