import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store.tsx";
import { fetchImages } from "../redux/movieSlice";
import { MdFavorite } from "react-icons/md";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toggleFavorite } from "../utils/toggle.Favorite.tsx";

const ShowsDetail: React.FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const images = useSelector((state: RootState) => state.image.images);
    const favorites = useSelector((state: RootState) => state.image.favorites);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchImages());
    }, [dispatch]);

    useEffect(() => {
        const img = images.find((image) => image.id === Number(id));
        setSelectedImage(img);
    }, [id, images]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-10">
            {selectedImage ? (
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-6xl flex flex-col lg:flex-row transition-all duration-300 ease-in-out">
                    <span className="absolute top-4 right-4 z-10">
                        <MdFavorite
                            className={`text-3xl hover:text-4xl cursor-pointer transition-all ${favorites.some((fav) => fav.id === selectedImage?.id) ? 'text-red-500' : 'text-gray-400'}`}
                            onClick={() => toggleFavorite(dispatch, favorites, selectedImage)}
                        />
                    </span>

                    <div className="w-full lg:w-1/2">
                        <img
                            src={selectedImage.image}
                            alt={selectedImage.name}
                            className="w-full h-64 sm:h-96 lg:h-full object-cover"
                        />
                    </div>

                    <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center space-y-4">
                        <h2 className="text-3xl font-bold text-blue-800 text-center">{selectedImage.name}</h2>
                        {selectedImage.summary && (
                            <div
                                className="text-gray-700 text-sm sm:text-base leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: selectedImage.summary }}
                            />
                        )}

                        <div>
                            <p><span className="font-bold">Tür:</span> {selectedImage.genres}</p>
                            <p><span className="font-bold">Yayın tarihi:</span> {selectedImage.airdate}</p>
                            <p><span className="font-bold">IMDB:</span> {selectedImage.imdbId}</p>
                            <p><span className="font-bold">Dil:</span> {selectedImage.language}</p>
                            <p><span className="font-bold">Bitiş tarihi:</span> {selectedImage.ended}</p>
                            <p><span className="font-bold">Oy oranı:</span> {selectedImage.rating?.average ?? "bilinmiyor"}</p>
                            <p><span className="font-bold">Yayın zamanı:</span> {selectedImage.schedule?.time ?? "bilinmiyor"}</p>
                            <p><span className="font-bold">Durumu:</span> {selectedImage.status}</p>
                        </div>
                        <button
                            className="font-bold mt-4 text-blue-600 hover:underline"
                            onClick={() => navigate('/HomePage')}
                        >
                            Geri Dön
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600">Yükleniyor...</p>
            )}
            <ToastContainer />
        </div>
    );
};

export default ShowsDetail;
