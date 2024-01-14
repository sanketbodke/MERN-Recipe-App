import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import home from "./pages/home";
import savedRecipes from "./pages/savedRecipes";
import createRecipe from "./pages/createRecipe";
import authLayout from "./pages/auth/authLayout";
import registerForm from "./pages/auth/forms/registerForm";
import loginForm from "./pages/auth/forms/loginForm";
import PrivateRoute from "./components/PrivateRoute";
import myRecipes from "./pages/myRecipes";
import Error404 from "./components/Error404.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route Component={authLayout}>
            <Route path="auth/login" Component={loginForm}></Route>
            <Route path="auth/register" Component={registerForm}></Route>
          </Route>

          <Route Component={PrivateRoute}>
            <Route index Component={home}></Route>
            <Route path="/create-recipe" Component={createRecipe}></Route>
            <Route path="/saved-recipes" Component={savedRecipes}></Route>
            <Route path="/my-recipes" Component={myRecipes}></Route>
          </Route>

          {/* Error 404 */}
          <Route path="*" Component={Error404}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
