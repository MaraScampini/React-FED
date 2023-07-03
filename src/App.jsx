import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from "./common/Header/Header"
import { Home } from "./pages/Home/Home"
import { Login } from "./pages/Login/Login"


function App() {

  return (
    <>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
