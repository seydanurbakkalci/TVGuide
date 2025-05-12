import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { MdFavorite } from "react-icons/md";
import { Image } from "../redux/movieSlice.tsx";

type CardListProps = {
    movies: Image[];
    favorites: Image[];
    toggleFavorite: (img: Image) => void;
};

const CardList: React.FC<CardListProps> = ({movies,  favorites, toggleFavorite }) => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 py-6">
            {movies.map((movie) => {
                const isFavorited = favorites.some((fav) => fav.id === movie.id);

                return (
                    <Card key={movie.id} className="flex flex-col shadow-md rounded-xl"
                          {...({} as React.ComponentProps<typeof Card>)}>
                        <CardHeader className="relative h-64 cursor-pointer overflow-hidden rounded-t-xl"
                                    {...({} as React.ComponentProps<typeof CardHeader>)}>
                            <img
                                src={movie.image}
                                alt={movie.name}
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center text-lg transition-opacity opacity-0 hover:opacity-100 rounded-t-xl">
                                <span
                                    className="font-bold text-xl cursor-pointer"
                                    onClick={() => navigate(`/detail/${movie.id}`)}
                                >
                                    Click for details
                                </span>
                                <span className="absolute top-2 right-2">
                                    <MdFavorite
                                        className={`cursor-pointer ${isFavorited ? "text-red-500" : "text-gray-400"} text-4xl hover:text-5xl`}
                                        onClick={() => toggleFavorite(movie)}
                                    />
                                </span>
                            </div>
                        </CardHeader>
                        <CardBody className="text-center p-2"  {...({} as React.ComponentProps<typeof CardBody>)}>
                            <Typography variant="h6" className="font-semibold"
                                        {...({} as React.ComponentProps<typeof Typography>)}>
                                {movie.name}
                            </Typography>
                        </CardBody>
                    </Card>
                );
            })}
        </div>
    );
};

export default CardList;
