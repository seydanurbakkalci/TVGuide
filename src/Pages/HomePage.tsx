import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { RootState, AppDispatch } from '../redux/store';
import { fetchImages, addFavorite, removeFavorite, setCurrentPage, setSelectedFilter} from '../redux/movieSlice';
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';
import { MdFavorite } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const images = useSelector((state: RootState) => state.image.images);
    const favorites = useSelector((state: RootState) => state.image.favorites);
    const currentPage = useSelector((state: RootState) => state.image.currentPage);
    const itemsPerPage = useSelector((state: RootState) => state.image.itemsPerPage);
    const selectedFilter = useSelector((state: RootState) => state.image.selectedFilter);
    const genres = useSelector((state: RootState) => state.image.genres);
    const [filteredImages, setFilteredImages] = useState(images);

    useEffect(() => {
        dispatch(fetchImages());

    }, [dispatch ]);

   const handleFilterClick=()=>{
       if(selectedFilter){
           const filtered =images.filter((img)=>{
               return img.genres && img.genres.includes(selectedFilter);
           });
           setFilteredImages(filtered);
       }else {
           setFilteredImages(images);
       }
   };

    const indexOfLastImage = currentPage * itemsPerPage;
    const indexOfFirstImage = indexOfLastImage - itemsPerPage;
    const currentImages = filteredImages.slice(indexOfFirstImage, indexOfLastImage);

    const toggleFavorite = (img: any) => {
        const isFavorited = favorites.some((fav) => fav.id === img.id);
        if (isFavorited) {
            dispatch(removeFavorite(img));
            toast.error(`${img.name} favorilerden çıkarıldı`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });
        } else {
            dispatch(addFavorite(img));
            toast.success(`${img.name} favorilere eklendi`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });
        }
    };

    const handlePageChange = (newPage: number) => {
        const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
        if (newPage >= 1 && newPage <= totalPages) {
            dispatch(setCurrentPage(newPage));
        }
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelectedFilter(event.target.value));
    };

    return (
        <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <select
                    value={selectedFilter}
                    onChange={handleFilterChange}
                    className="h-14 w-full md:w-52 border border-gray-300 rounded px-3"
                >
                    <option value="">Film türü filtrele...</option>
                    {genres.map((genre) => (
                        <option key={genre} value={genre.toLowerCase()}>
                            {genre}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleFilterClick}
                    className="w-full md:w-auto px-8 py-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                                hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg"
                >Filtrele
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentImages.length > 0 ? (
                    currentImages.map((img) => {
                        const isFavorited = favorites.some((fav) => fav.id === img.id);
                        return (
                            <Card key={img.id} className="flex flex-col w-full">
                                <CardHeader shadow={false} floated={false} className="relative w-full h-[350px] md:h-[400px]">
                                    <img
                                        src={img.image}
                                        alt={img.name}
                                        className="w-full h-full object-cover cursor-pointer rounded-t-xl"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 text-white flex items-center justify-center text-lg transition-opacity rounded-t-xl">
                                    <span
                                        className="font-bold text-xl cursor-pointer"
                                        onClick={() => navigate(`/details/${img.id}`)}
                                    >
                                        Detay İçin Tıkla
                                    </span>
                                        <span className="absolute top-2 right-2">
                                        <MdFavorite
                                            className={`text-3xl hover:text-4xl cursor-pointer transition-all ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}
                                            onClick={() => toggleFavorite(img)}
                                        />
                                    </span>
                                    </div>
                                </CardHeader>
                                <CardBody className="p-4">
                                    <Typography className="font-bold text-center text-xl md:text-2xl text-black">
                                        {img.name}
                                    </Typography>
                                </CardBody>
                            </Card>
                        );
                    })
                ) : (
                    <p className="text-center col-span-full text-gray-500">Sonuç bulunamadı.</p>
                )}
            </div>
,
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
                >
                    <FaAnglesLeft />
                </button>
                <span className="text-lg font-medium">{currentPage}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredImages.length / itemsPerPage)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
                >
                    <FaAnglesRight />
                </button>
            </div>
            <ToastContainer />
        </div>
    );

};

export default HomePage;
