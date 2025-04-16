import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ShowsDetail: React.FC = () => {
    const { id } = useParams();
    const images = useSelector((state: RootState) => state.image.images);
    const [selectedImage, setSelectedImage] = useState<any>(null);

    useEffect(() => {
        const img = images.find((image) => image.id === Number(id));
        setSelectedImage(img);
    }, [id, images]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-10">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-6xl flex flex-col lg:flex-row transition-all duration-300 ease-in-out">
                <div className="w-full lg:w-1/2">
                    <img
                        src={selectedImage?.image}
                        alt={selectedImage?.name}
                        className="w-full h-64 sm:h-96 lg:h-full object-cover"
                    />
                </div>
                <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 underline">
                        Adı: {selectedImage?.name}
                    </h2>
                    <p className="text-gray-700 text-md sm:text-lg leading-relaxed">
                        {selectedImage?.summary || "Açıklama bulunamadı."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShowsDetail;
