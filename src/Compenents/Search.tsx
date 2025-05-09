import React, { useCallback, useEffect ,useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchSearchResults, setDropdown, closeSearchDropdown } from "../redux/movieSlice";
import debounce from 'lodash/debounce';

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchResults = useSelector((state: RootState) => state.image.searchResults);
    const searchDropdown = useSelector((state: RootState) => state.image.searchDropdown);

    // Refs to track if the click is inside or outside the dropdown
    const searchRef = useRef(null);

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            dispatch(fetchSearchResults(query));
        }, 300),
        [dispatch]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        debouncedSearch(query);
        if (query === "") {
            dispatch(closeSearchDropdown());
        } else {
            dispatch(setDropdown(true));
        }
    };

    // Handle click outside logic using ref
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target) && searchDropdown) {
                dispatch(closeSearchDropdown());
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dispatch, searchDropdown]);


    return (
        <div ref={searchRef} className="relative w-full lg:w-80 search-container">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 text-2xl" />
            <input
                type="search"
                placeholder="Search movies..."
                className="text-base text-black h-10 w-full pl-10 pr-4 rounded-md"
                onChange={handleChange}
            />

            {searchDropdown && searchResults.length > 0 && (
                <div  className="absolute top-full mt-2 bg-white text-black rounded-lg shadow-lg w-full lg:w-96 z-50">
                    {searchResults.map((movie) => (
                        <div
                            key={movie.id}
                            className="flex items-center gap-4 p-2 hover:bg-blue-100 cursor-pointer"
                            onClick={() => {
                                navigate(`/detail/${movie.id}`);
                                dispatch(closeSearchDropdown());
                            }}
                        >
                            <img
                                src={movie.image}
                                alt={movie.name}
                                className="w-12 h-16 object-cover rounded"
                            />
                            <p className="text-sm">{movie.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
