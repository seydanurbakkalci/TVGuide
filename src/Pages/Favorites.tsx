import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store.tsx";
import { removeFavorite } from "../redux/movieSlice.tsx";
import { Card, CardHeader, CardBody,Typography } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Favorites: React.FC = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.image.favorites);
    const navigate = useNavigate();

    return (
        <div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
                {favorites.map((img) => (
                    <Card key={img.id} className="flex-row max-w-[20rem]">
                        <CardHeader shadow={false} floated={false} className="m-0 w-full shrink-0 rounded-r-none relative">
                            <img src={img.image} alt={img.name} className="h-full w-full object-cover cursor-pointer rounded-3xl" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 text-white flex items-center justify-center text-lg transition-opacity rounded-3xl">
                    <span className="font-bold text-xl cursor-pointer" onClick={() => navigate("/favorites")}>
                     <MdDelete
                         className="h-10 w-10 hover:h-14 w-14 cursor-pointer hover:text-red-700"
                         onClick={() => dispatch(removeFavorite(img))}>
                      </MdDelete>
                    </span>
                            </div>
                        </CardHeader>
                        <CardBody className="p-2">
                            <Typography className="text-center text-xl font-semibold text-black"></Typography>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>

    );
};

export default Favorites;
