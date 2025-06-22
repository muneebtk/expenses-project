import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { AppDispatch } from "../store/store";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Grid,
  InputAdornment,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import http from "../api/http";
import type { Expense } from "../features/dashboard/Types";
import { useDispatch } from "react-redux";
import Header from "../components/layout/Header";
import { Delete, Edit } from "@mui/icons-material";

const categories = ["Food", "Travel", "Miscellaneous", "Utilities"];

const ExpenseDetail: React.FC = () => {
  const { expenseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await http.get(`/api/expenses/${expenseId}/`);
        setExpense(response.data);
      } catch (err) {
        setError("Failed to fetch expense details");
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, [expenseId]);

  const handleUpdate = async () => {
    if (!expense) return;

    try {
      await http.put(`/api/expenses/${expenseId}/`, expense);
      setIsEditing(false);
      // Refresh the dashboard data
      dispatch(loadExpenses());
      dispatch(loadCategorySummary());
    } catch (err) {
      setError("Failed to update expense");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await http.delete(`/api/expenses/${expenseId}/`);
        navigate("/");
        // Refresh the dashboard data
        dispatch(loadExpenses());
        dispatch(loadCategorySummary());
      } catch (err) {
        setError("Failed to delete expense");
      }
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth="md"
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!expense) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Expense not found</Alert>
      </Container>
    );
  }

  return (
    <>
      <Header />
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Container
        maxWidth={false}
        sx={{
          mt: 4,
          mb: 4,
          px: { xs: 2, sm: 3 },
          maxWidth: "none !important",
        }}
      >
        <Paper elevation={2} sx={{ p: 3, minWidth: 800 }}>
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
              borderBottom: "1px solid",
              borderColor: "divider",
              pb: 2,
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {isEditing ? "Edit Expense" : "Expense Details"}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {isEditing ? (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsEditing(true)}
                    startIcon={<Edit />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDelete}
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Box>
          </Box>

          {/* Form Section */}
          <Grid container spacing={5} sx={{ justifyContent: "space-between" }}>
            {/* First Row */}
            <Grid item xs={12} md={6}>
              {isEditing ? (
                <TextField
                  label="Title"
                  value={expense.title}
                  onChange={(e) =>
                    setExpense({ ...expense, title: e.target.value })
                  }
                  fullWidth
                  size="small"
                  required
                />
              ) : (
                <DetailItem label="Title" value={expense.title} />
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              {isEditing ? (
                <TextField
                  label="Amount"
                  type="number"
                  value={expense.amount}
                  onChange={(e) =>
                    setExpense({
                      ...expense,
                      amount: parseFloat(e.target.value),
                    })
                  }
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              ) : (
                <DetailItem label="Amount" value={`$${expense.amount}`} />
              )}
            </Grid>

            {/* Second Row */}
            <Grid item xs={12} md={6}>
              {isEditing ? (
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    sx={{ minWidth: 250 }}
                    value={expense.category}
                    label="Category"
                    onChange={(e) =>
                      setExpense({ ...expense, category: e.target.value })
                    }
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <DetailItem label="Category" value={expense.category} />
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              {isEditing ? (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    value={new Date(expense.date)}
                    onChange={(date) =>
                      setExpense({
                        ...expense,
                        date: date?.toISOString().split("T")[0] || expense.date,
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} fullWidth size="small" />
                    )}
                  />
                </LocalizationProvider>
              ) : (
                <DetailItem
                  label="Date"
                  value={new Date(expense.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                />
              )}
            </Grid>
            {/* notes */}
            <Grid item xs={12}>
              {isEditing ? (
                <TextField
                  label="Notes"
                  value={expense.notes}
                  onChange={(e) =>
                    setExpense({ ...expense, notes: e.target.value })
                  }
                  fullWidth
                  multiline
                  rows={4}
                  size="small"
                />
              ) : (
                <Box sx={{ mt: 1 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Notes
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2, minHeight: 120 }}>
                    <Typography>
                      {expense.notes || <em>No notes provided</em>}
                    </Typography>
                  </Paper>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

// Reusable DetailItem component
const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: "flex", flexDirection: "column" }}>
    <Typography variant="subtitle2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1" sx={{ mt: 0.5 }}>
      {value}
    </Typography>
  </Box>
);

export default ExpenseDetail;
