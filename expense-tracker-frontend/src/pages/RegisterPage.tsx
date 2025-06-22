import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../features/auth/authService";
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
import { PersonAdd } from "@mui/icons-material";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { confirm_password, ...userData } = formData;
      const response = await register(formData);
      localStorage.setItem("accessToken", response.access);
      localStorage.setItem("refreshToken", response.refresh);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
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
          <PersonAdd color="primary" sx={{ fontSize: 40, mr: 1 }} />
          <Typography component="h1" variant="h4">
            Sign up
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
            id="firstName"
            label="First Name"
            name="first_name"
            autoComplete="given-name"
            autoFocus
            value={formData.first_name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="last_name"
            autoComplete="family-name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm_password"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formData.confirm_password}
            onChange={handleChange}
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
            {loading ? "Registering..." : "Register"}
          </Button>
          <Box>
            Already have an account?
            <Link href="/login" variant="body2">
              Sign in
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
