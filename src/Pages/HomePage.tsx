import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {setCurrentPage, setSelectedFilter, fetchImages} from "../redux/movieSlice";
import {toggleFavorite} from "../Utils/toggle.Favorite";
import CardList from "../Compenents/CardList.tsx";


const HomePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {movies, currentPage, itemsPerPage, selectedFilter, favorites} = useSelector(
        (state: RootState) => state.image
    );

    useEffect(() => {
        dispatch(fetchImages());
    }, []);

    useEffect(() => {
        const savedFilter = localStorage.getItem('selectedFilter');
        if (savedFilter) {
            dispatch(setSelectedFilter(savedFilter));
        }
    }, []);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    },[selectedFilter]);

    const filteredImages = movies
        .filter((movie) => (selectedFilter ? movie.genres.includes(selectedFilter) : true));

    console.log("selectedfilter", selectedFilter)
    console.log("movies", movies)
    console.log("currentpage",currentPage)

    const genres = Array.from(new Set(movies.flatMap((movie) => movie.genres)));
    const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
    const paginatedImages = filteredImages.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="p-4">
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
                {Array.from({length: totalPages}, (_, i) => i + 1).map((num) => (
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