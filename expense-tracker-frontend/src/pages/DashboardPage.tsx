import React, { useEffect } from "react";
import type { AppDispatch } from "../store/store";
import {
  loadExpenses,
  loadCategorySummary,
} from "../features/dashboard/dashboardSlice";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import ExpenseFilter from "../features/dashboard/components/ExpenseFilter";
import AddExpenseForm from "../features/dashboard/components/AddExpenseForm";
import CategoryChart from "../features/dashboard/components/CategoryChart";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/layout/Header";
import ExpenseGrid from "../features/dashboard/components/ExpenseGrid";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { expenses, categorySummary, loading, error } = useSelector(
    (state) => state.dashboard
  );
  let userString;
  let user;
  userString = localStorage.getItem("user");
  user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    dispatch(loadExpenses());
    dispatch(loadCategorySummary());
  }, [dispatch]);
  const columnDefs = [
    {
      headerName: "Title",
      field: "title",
      sortable: true,
      filter: true,
      cellStyle: { textAlign: "center" },
    },
    { headerName: "Amount", field: "amount", sortable: true, filter: true },
    { headerName: "Category", field: "category", sortable: true, filter: true },
    {
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
      valueFormatter: ({ value }: { value: string }) =>
        value
          ? new Date(value).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "",
    },
    {
      headerName: "Action",
      field: "action",
      cellRenderer: (params) => (
        <Tooltip title="View Details">
          <IconButton
            color="primary"
            onClick={() => navigate(`/expenses/${params.data.id}`)}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user?.first_name}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        <ExpenseFilter />
        <Grid container spacing={3}>
          {/* Expenses - 60% width */}
          <Grid item xs={12} md={7.2}>
            {" "}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Your Expenses</Typography>
              <AddExpenseForm />
            </Box>
            {loading ? (
              <CircularProgress />
            ) : (
              <ExpenseGrid expenses={expenses} columnDefs={columnDefs} />
            )}
          </Grid>
          {/* Chart - 40% width */}
          <Grid item xs={12} md={4.8}>
            {" "}
            <CategoryChart data={categorySummary} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
