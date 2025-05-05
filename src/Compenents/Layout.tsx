import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosLogIn } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { fetchImages } from "../redux/movieSlice.tsx";
import { RootState } from "../redux/store";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { FaAngleDoubleLeft ,FaAngleDoubleRight  } from "react-icons/fa";
import { motion } from "motion/react";

const Layout: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const images = useSelector((state: RootState) => state.image.images);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [visibleImages, setVisibleImages] = useState(images.slice(0, 6));
    const navigate = useNavigate();

    useEffect(() => {
        if (images.length === 0) {
            dispatch(fetchImages());
        } else {
            setVisibleImages(images.slice(0, 6));
        }
    }, [dispatch, images]);

    useEffect(() => {
        setVisibleImages(images.slice(scrollPosition, scrollPosition + 6));
    }, [scrollPosition, images]);


    const handleScrollLeft = () => {
        if (scrollPosition > 0) {
            setScrollPosition(scrollPosition - 1);
        }
    };

    const handleScrollRight = () => {
        if (scrollPosition < 10) {
            setScrollPosition(scrollPosition + 1);
        }
    };

    return (

        <div className="relative ">

            <video
                className="w-full sm:h-[50vh] object-cover filter blur-md "
                src="/images/video.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ display: "block" }}
            />
         

            <div className=" absolute top-48 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-black text-xl sm:text-3xl font-bold mb-4">
                    Filmin Keyfini Çıkarmaya
                </p>
                <p  className="text-black text-xl sm:text-3xl font-bold mb-4">Var Mısın?</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="flex items-center justify-center px-8 sm:px-16 py-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                     hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm">
                        Giriş Yap <IoIosLogIn className="text-2xl ml-2" />
                    </button>

                    <button className="flex items-center justify-center px-8 sm:px-16 py-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                     hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm">
                        Üye Ol <IoPersonCircle className="text-2xl ml-2" />
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }}
>
            <div className="py-16">
                <p className="px-6 sm:px-10 text-4xl  font-bold ">
                    Gündemdekiler
                </p>


                <div className="relative">
                    <button
                        onClick={handleScrollLeft}
                        className="absolute left-2 sm:left-24 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white rounded-full p-2 sm:p-3 z-10"
                        disabled={scrollPosition === 0}
                    >
                        <FaAngleDoubleLeft />
                    </button>
                    <div className="overflow-x-auto flex space-x-4  py-16 px-4 sm:px-36">
                        {visibleImages.length > 0 ? (
                            visibleImages.map((img: any) => (
                                <div
                                    key={img.id}
                                    className="bg-white rounded-2xl shadow-md overflow-hidden transition transform hover:scale-105 w-[60vw] sm:w-64 flex-shrink-0"
                                >
                                    <img
                                        src={img.image || "/placeholder.jpg"}
                                        alt={img.name}
                                        className="w-full h-40 sm:h-64 object-cover cursor-pointer"
                                        onClick={() => navigate(`/details/${img.id}`)}
                                    />
                                    <div className="p-4">
                                        <h2 className="font-semibold text-base sm:text-lg">
                                            {img.name}
                                        </h2>
                                        {img.imdbId && (
                                            <p className="text-sm text-black mt-2 font-bold">
                                                IMDb: {img.imdbId}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">
                                Veriler yükleniyor...
                            </p>
                        )}
                    </div>

                    <button
                        onClick={handleScrollRight}
                        className="absolute right-2 sm:right-20 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white rounded-full p-2 sm:p-3 z-10"

                    >
                        <FaAngleDoubleRight />
                    </button>
                </div>
            </div>
            </motion.div>
        </div>

    );
};

export default Layout;
