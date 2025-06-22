import React, { useState } from "react";
import type { AppDispatch } from "../../../store/store";
import { loadExpenses, loadCategorySummary } from "../dashboardSlice";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDispatch } from "react-redux";

const ExpenseFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [category, setCategory] = useState<string>("");

  const categories = ["Food", "Travel", "Utilities", "Miscellaneous"];

  const handleFilter = () => {
    const params = {
      startDate: startDate?.toISOString().split("T")[0],
      endDate: endDate?.toISOString().split("T")[0],
      category: category || undefined,
    };
    dispatch(loadExpenses(params));
    dispatch(loadCategorySummary(params));
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setCategory("");
    dispatch(loadExpenses());
    dispatch(loadCategorySummary());
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={setEndDate}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ minWidth: 250 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value as string)}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="contained" onClick={handleFilter}>
            Apply Filters
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ExpenseFilter;
