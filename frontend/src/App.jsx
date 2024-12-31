import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroSection from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import LoginForm from "./components/Users/Login";
import RegistrationForm from "./components/Users/Register";
import { useSelector } from "react-redux";
import { getUserFromStorage } from "./utils/getUserFromStorage";
import AddCategory from "./components/Category/AddCategory";
import CategoriesList from "./components/Category/CategoriesList";
import UpdateCategory from "./components/Category/UpdateCategory";
import TransactionForm from "./components/Transactions/TransactionForm";
import Dashboard from "./components/Users/Dashboard";
import UserProfile from "./components/Users/UserProfile";
import AuthRoutes from "./components/Auth/AuthRoutes";
import TransactionUpdate from "./components/Transactions/updateTransaction";
export default function App() {
  const token = getUserFromStorage();
  const user = useSelector((state) => state?.auth?.user);
  console.log(user);
  return (
    <BrowserRouter>
      {user ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route
          path="add-category"
          element={
            <AuthRoutes>
              <AddCategory />
            </AuthRoutes>
          }
        />
        <Route
          path="categories"
          element={
            <AuthRoutes>
              <CategoriesList />
            </AuthRoutes>
          }
        />
        <Route
          path="update-category/:id"
          element={
            <AuthRoutes>
              <UpdateCategory />
            </AuthRoutes>
          }
        />
        <Route
          path="add-transaction"
          element={
            <AuthRoutes>
              <TransactionForm />
            </AuthRoutes>
          }
        />
        <Route
          path="dashboard"
          element={
            <AuthRoutes>
              <Dashboard />
            </AuthRoutes>
          }
        />
        {/* <Route path="profile" element={<UserProfile />} /> */}
        <Route
          path="/profile"
          element={
            <AuthRoutes>
              <UserProfile />
            </AuthRoutes>
          }
        />
        <Route
          path="update-transaction/:id"
          element={
            <AuthRoutes>
              <TransactionUpdate />
            </AuthRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
