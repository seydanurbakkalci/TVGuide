import Header from "./Compenents/Header.tsx";
import {Route, Routes} from "react-router-dom";
import Favorites from "./Pages/Favorites.tsx";
import HomePage from "./Pages/HomePage.tsx";
import Layout from "./Compenents/Layout.tsx";
import ShowsDetail from "./Pages/ShowsDetail.tsx";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import Footer from "./Compenents/Footer.tsx";
import {fetchSearchResults} from "./redux/movieSlice.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store.tsx";
import {useEffect} from "react";
import Loading from "./Compenents/Loading.tsx";


function App() {

    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.image.loading);  // loading durumunu Redux'tan çekiyoruz

    // Arama işlemi başlatılıyor
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchSearchResults('initial query')); // Burada ilk arama yapılabilir ya da dinamik olarak arama yapılabilir
    }, [dispatch]);
    return (
        <div>
            <Header/>
            {/* Yükleniyor componenti burada gösteriliyor */}
            {loading && <Loading />}
            <Routes>
                <Route path="/" element={<Layout/>}/>
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
