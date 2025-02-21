import { Route ,Routes} from "react-router-dom";
import { Home } from './pages/home/Home';
import { Profile } from "./pages/profile/Profile";
import { Favorite } from "./components/Favorite";
import { Cart } from "./components/Cart";
import './i18n'
import { ProductDetail } from "./pages/product details/ProductDetail";
import StripePayment from "./stripe/StripePayment";
import { ProductsByCategory } from "./pages/products by category/ProductsByCategory";
import { CompanyDashboard } from "./pages/copmapny dashboard/CompanyDashboard";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<CompanyDashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/details/:id" element={<ProductDetail />} />
        <Route path="/stripePayment" element={<StripePayment />} />
        <Route path="/:category" element={<ProductsByCategory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
