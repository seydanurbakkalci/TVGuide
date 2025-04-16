import Header from "./Compenents/Header.tsx";
import {Route, Routes} from "react-router-dom";
import Favorites from "./Pages/Favorites.tsx";
import HomePage from "./Pages/HomePage.tsx";
import Layout from "./Compenents/Layout.tsx";
import ShowsDetail from "./Pages/ShowsDetail.tsx";

function App() {
    return (
    <div  >
        <Header title={"TV GUİDE"}/>

        <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/homepage" element={<HomePage/>}/>
            <Route path="/details/:id" element={<ShowsDetail/>}/>
        </Routes>

    </div>
  )
}

export default App
