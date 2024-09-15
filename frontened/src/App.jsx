import Footer from "./components/myComponents/Footer"
import NavBar from "./components/myComponents/NavBar"
import { Outlet } from "react-router-dom"

function App({ }) {

  return (
    <>
      <NavBar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default App