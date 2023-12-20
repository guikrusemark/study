
import "./styles/main.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom" 

import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./components/Menu";

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="*" element={<h1 className="capitalize text-2xl font-bold flex justify-center p-8">404 | NADA ENCONTRADO</h1> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}
