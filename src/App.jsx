import { Route ,Routes} from "react-router-dom";
import { Home } from './pages/home/Home';
import { Profile } from "./pages/profile/Profile";
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import { Favorite } from "./components/Favorite";
import { Cart } from "./components/Cart";
import './i18n'
import { Dinning } from "./pages/dinning/Dinning";
import { Salon } from "./pages/salon/Salon";
import { Entertainment } from "./pages/entertainment/Entertainmeent";
import { HomeServices } from "./pages/home services/HomeServices";
import { ProductDetail } from "./pages/product details/ProductDetail";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dinning" element={<Dinning />} />
        <Route path="/salon" element={<Salon />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/home services" element={<HomeServices />} />
        <Route path="/product/details/:id" element={<ProductDetail />} />
      </Routes>
    </>
  )
}

export default App
