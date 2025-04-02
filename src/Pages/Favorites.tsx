import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store.tsx";
import {removeFavorite} from "../redux/imageSlice.tsx";

const Favorites: React.FC = () => {
    const dispatch = useDispatch();
    const favorites=useSelector((state:RootState)=>state.image.favorites);

    return (
        <div>
            <h1 className="text-center text-black text-4xl underline">FAVORİLER</h1>
            <div className="grid grid-cols-4 gap-4 ">
                {favorites.map((movie)=>(
                    <div className="mb-5">
                        <img src={movie.image} alt={movie.name}/>
                        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
        hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300
        dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>dispatch(removeFavorite(movie))}>Favorilerden kaldır</button>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default Favorites;
