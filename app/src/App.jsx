import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header/Header";
import Jops from "./components/Dashboard/Jops";
import AddJops from "./components/Dashboard/AddJops";
import Edit from "./components/Dashboard/Edit";
import RequireAuth from "./routes/RequireAuth";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="jops" element={<Jops />} />
            <Route path="jops/edit/:id" element={<Edit />} />
            <Route path="addJop" element={<AddJops />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
