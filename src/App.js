import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import "./App.css";
import Dishes from "./pages/Dishes/Dishes";
import AddNewDish from "./pages/Dishes/AddNewDish";
import Category from "./pages/Category/Category";
import AddNewCategory from "./pages/Category/AddNewCategory";
import Modifiers from "./pages/modifier/Modifiers";
import AddNewModifier from "./pages/modifier/AddNewModifier";
import Login from "./pages/Auth/Login";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/dishes" element={<Dishes />} />
            <Route path="/dishes/addDish" element={<AddNewDish />} />
            <Route path="/categories" element={<Category />} />
            <Route
              path="/categories/addCategory"
              element={<AddNewCategory />}
            />
            <Route path="/modifiers" element={<Modifiers />} />
            <Route path="/modifiers/addModifier" element={<AddNewModifier />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
