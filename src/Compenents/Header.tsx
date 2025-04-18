import React, { useEffect, useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoHomeOutline, IoSearch } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSearch } from "../redux/movieSlice";

type HeaderProps = {
    title: string;
};

const Header: React.FC<HeaderProps> = () => {
    const dispatch = useDispatch();
    const search = useSelector((state: RootState) => state.image.search);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const query = search.trim();
            if (query === "") {
                setSearchResults([]);
            } else {
                fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
                    .then((response) => response.json())
                    .then((data) => {
                        const results = data.map((item: any) => ({
                            id: item.show.id,
                            name: item.show.name,
                            image: item.show.image?.medium ?? "/images/placeholder.png"
                        }));
                        setSearchResults(results.slice(0, 10));
                    })
                    .catch((error) => {
                        console.error("API error:", error);
                        setSearchResults([]);
                    });
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search]);

    return (
        <header className="bg-blue-950 text-white px-4 py-2 flex flex-wrap lg:flex-nowrap items-center justify-between relative gap-2">
            <div className="flex items-center gap-4 flex-wrap relative w-full lg:w-auto">
                <h1
                    className="text-xl font-bold  hover:text-blue-300 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <img src="/images/img4.png" className="h-13 w-20" />
                </h1>

                <div className="flex items-center w-full lg:w-auto gap-2">
                    <input
                        type="search"
                        placeholder="Search for..."
                        value={search}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                        className="text-base text-black h-10 w-full lg:w-80 px-4 rounded-md"
                    />

                    <button
                        className="p-2 text-white bg-gradient-to-r from-blue-500 via-blue-600
                            to-blue-700 hover:bg-gradient-to-br dark:focus:ring-blue-800 font-medium
                            rounded-lg text-sm text-center"
                    >
                        <IoSearch className="text-xl " />
                    </button>
                </div>

                {searchResults.length > 0 && (
                    <div className="absolute top-full mt-2 bg-white text-black rounded-lg shadow-lg w-full lg:w-96 z-50">
                        {searchResults.map((movie) => (
                            <div
                                key={movie.id}
                                className="flex items-center gap-4 p-2 hover:bg-blue-100 cursor-pointer"
                                onClick={() =>{
                                    navigate(`/details/${movie.id}`)
                                    dispatch(setSearch(""));
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

            <div className="flex justify-center lg:justify-end items-center gap-4 w-full lg:w-auto text-2xl mt-2 lg:mt-0">
                <IoHomeOutline
                    className=" hover:text-blue-300 cursor-pointer"
                    onClick={() => navigate("/homepage")}
                />
                <MdOutlineDarkMode className=" hover:text-blue-300 cursor-pointer" />
                <div
                    className="flex items-center gap-1 hover:text-blue-300 cursor-pointer"
                    onClick={() => navigate("/favorites")}
                >
                    <MdFavoriteBorder />
                    <p className="text-base lg:text-xl">favorilerim</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
