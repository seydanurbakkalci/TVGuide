import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CardList from "../Compenents/CardList";
import { fetchImages } from "../redux/movieSlice.tsx";
import { toggleFavorite } from "../utils/toggle.Favorite";

const Favorites: React.FC = () => {
    const dispatch = useDispatch();
    const { favorites } = useSelector((state: RootState) => state.image);

    useEffect(() => {
        dispatch(fetchImages());
    }, [dispatch]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Favori Filmler</h1>
            {favorites.length > 0 ? (
                <CardList
                    movies={favorites}
                    favorites={favorites}
                    toggleFavorite={(movie) => toggleFavorite(dispatch, favorites, movie)}
                />

            ) : (
                <p>Henüz favori eklenmemiş.</p>
            )}
        </div>
    );
};

export default Favorites;
