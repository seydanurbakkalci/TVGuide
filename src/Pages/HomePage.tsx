import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {setImages, setCurrentPage, setSelectedFilter, fetchImages} from "../redux/movieSlice";
import { toggleFavorite } from "../utils/toggle.Favorite";
import CardList from "../Compenents/CardList";

const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const { images, search, currentPage, itemsPerPage, selectedFilter, genres, favorites } = useSelector(
        (state: RootState) => state.image
    );


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.tvmaze.com/shows");
                const data = await response.json();
                console.log("Fetched Data: ", data);
                dispatch(setImages(data));
            } catch (error) {
                console.error(" hata:", error);
            }
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchImages());
    }, [dispatch]);


    const filteredImages = images
        .filter((movie) => movie.name.toLowerCase().includes(search.toLowerCase()))
        .filter((movie) => (selectedFilter ? movie.genres.includes(selectedFilter) : true));


    const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
    const paginatedImages = filteredImages.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="p-4">
            {/* Genre Filter */}
            <div className="flex flex-wrap gap-2 mb-4">
                {genres.map((genre) => (
                    <button
                        key={genre}
                        onClick={() => dispatch(setSelectedFilter(genre))}
                        className={`px-3 py-1 rounded-full text-sm ${
                            selectedFilter === genre
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-black font-bold"
                        }`}
                    >
                        {genre}
                    </button>
                ))}
                <button
                    onClick={() => dispatch(setSelectedFilter(""))}
                    className="px-3 py-1 rounded-full bg-red-300 text-black"
                >
                    Temizle
                </button>
            </div>

            <CardList
                movies={paginatedImages}
                favorites={favorites}
                toggleFavorite={(img) => toggleFavorite(dispatch, favorites, img)}
            />
            <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                        key={num}
                        onClick={() => dispatch(setCurrentPage(num))}
                        className={`px-3 py-1 rounded-full ${
                            currentPage === num
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-800"
                        }`}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
