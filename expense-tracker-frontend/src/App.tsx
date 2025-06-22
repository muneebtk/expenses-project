import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { store } from "./store/store";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ExpenseDetail from "./pages/ExpenseDetailPage";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";


function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute/>}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            </Route>
            {/* <Route path="/" element={<DashboardPage />} />
            <Route path="/expenses/:expenseId" element={<ExpenseDetail />} /> */}
            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/expenses/:expenseId" element={<ExpenseDetail />} />
              {/* Add more protected routes here */}
            </Route>

            {/* Public Routes */}
            {/* <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/expenses/:expenseId"
              element={
                <PrivateRoute>
                  <ExpenseDetail />
                </PrivateRoute>
              }
            /> */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
