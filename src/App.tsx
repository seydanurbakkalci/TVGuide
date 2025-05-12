import Header from "./Compenents/Header.tsx";
import {Route, Routes} from "react-router-dom";
import Favorites from "./Pages/Favorites.tsx";
import HomePage from "./Pages/HomePage.tsx";
import Layout from "./Compenents/Layout.tsx";
import ShowsDetail from "./Pages/ShowsDetail.tsx";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import Footer from "./Compenents/Footer.tsx";

function App() {
    return (
    <div  >
        <Header />

        <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/homepage" element={<HomePage/>}/>
            <Route path="/detail/:id" element={<ShowsDetail/>}/>
        </Routes>

        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <Footer/>


    </div>
  )
}

export default App
