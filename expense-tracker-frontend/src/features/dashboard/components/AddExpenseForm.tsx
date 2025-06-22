import React, { useState } from "react";
import type { AppDispatch } from "../../../store/store";
import { addExpense } from "../dashboardSlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";

const categories = ["Food", "Utilities", "Travel", "Miscellaneous"];

const AddExpenseForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: "",
  });
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (
      !expenseData.amount ||
      !expenseData.category ||
      !expenseData.date ||
      !expenseData.title
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      await dispatch(addExpense(expenseData)).unwrap();
      handleClose();
    } catch (err) {
      setError("Failed to add expense. Please try again.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      setExpenseData((prev) => ({
        ...prev,
        date: dateString,
      }));
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setOpen(true)}
        sx={{ mb: 2 }}
      >
        Add Expense
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Expense</DialogTitle>
        <DialogContent>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Title"
              name="title"
              //   type="text"
              value={expenseData.title}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Amount"
              type="number"
              name="amount"
              value={expenseData.amount}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="notes"
              name="notes"
              value={expenseData.notes}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={2}
            />
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={expenseData.category}
                label="Category"
                name="category"
                onChange={handleInputChange}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                selected={expenseData.date ? new Date(expenseData.date) : null}
                onChange={handleDateChange}
                customInput={
                  <TextField
                    fullWidth
                    required
                    label="Date"
                    value={expenseData.date}
                  />
                }
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddExpenseForm;
