import Footer from "./components/myComponents/Footer"
import NavBar from "./components/myComponents/NavBar"
import { Outlet } from "react-router-dom"

function App({ }) {

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App