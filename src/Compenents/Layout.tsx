import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {IoIosLogIn} from "react-icons/io";
import {IoPersonCircle} from "react-icons/io5";
import {fetchImages} from "../redux/movieSlice.tsx";
import {RootState, AppDispatch} from "../redux/store";
import {useNavigate} from "react-router-dom";
import {motion} from "motion/react";

const Layout: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const images = useSelector((state: RootState) => state.image.movies);
    const navigate = useNavigate();

    useEffect(() => {
        if (images.length === 0) {
            dispatch(fetchImages());
        } else {
            dispatch({type: "image/Images"});
        }
    }, [dispatch, images]);


    return (
        <div className="relative ">
            <video
                className="w-full sm:h-[50vh] object-cover filter blur-md "
                src="/images/video.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{display: "block"}}
            />
            <div className=" absolute top-48 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-black text-xl sm:text-3xl font-bold mb-4">
                    Are you ready to enjoy
                </p>
                <p className="text-black text-xl sm:text-3xl font-bold mb-4">the movie?</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="flex items-center justify-center px-8 sm:px-16 py-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                     hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm">
                        Log in <IoIosLogIn className="text-2xl ml-2"/>
                    </button>
                    <button className="flex items-center justify-center px-8 sm:px-16 py-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                     hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm">
                        Sign up <IoPersonCircle className="text-2xl ml-2"/>
                    </button>
                </div>
            </div>

            <motion.div
                initial={{opacity: 0, scale: 0}}
                animate={{opacity: 1, scale: 1}}
                transition={{
                    duration: 0.4,
                    scale: {type: "spring", visualDuration: 0.4, bounce: 0.5},
                }}>
                <div className="py-16">
                    <p className="px-6 sm:px-10 text-4xl  font-bold ">
                        Trending Now
                    </p>
                    <div className="relative">

                        <div className="flex space-x-4 py-16 px-4 sm:px-36 overflow-hidden">

                            {images.length > 0 ? (
                                images.map((img: any) => (
                                    <div
                                        key={img.id}
                                        className="bg-white rounded-2xl shadow-md overflow-hidden transition transform hover:scale-105 w-[60vw] sm:w-64 flex-shrink-0"
                                    >
                                        <img
                                            src={img.image || "/placeholder.jpg"}
                                            alt={img.name}
                                            className="w-full h-40 sm:h-64 object-cover cursor-pointer"
                                            onClick={() => navigate(`/detail/${img.id}`)}
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
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{opacity: 0, scale: 0}}
                animate={{opacity: 1, scale: 1}}
                transition={{
                    duration: 0.4,
                    scale: {type: "spring", visualDuration: 0.4, bounce: 0.5},
                }}>

                <div className="bg-blue-950 text-white px-10 py-20 flex gap-60 relative justify-center">
                    <div className="text-center text-3xl">
                        New Releases
                        <div className="py-10 px-10 bg-white w-[350px] h-[500px] rounded-3xl ">
                            <img src="/images/img5.png " className="w-[300px] h-[200px] "/>
                            <p className="text-black py-6 text-base">Discover the freshest and most exciting productions
                                in cinema! New releases in theaters and the most popular content
                                on digital platforms are waiting for movie lovers. With our "New Releases" section, you
                                can stay updated on what's
                                happening in the world of cinema and have the opportunity to watch the latest films.</p>
                        </div>
                    </div>
                    <div className="text-center">
                        Top Viewed
                        <div className="py-10 px-10 bg-white w-[300px] h-[400px] rounded-3xl">
                            <img src="/images/img6.jpg" className="w-[500px] h-[200px] "/>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="bg-white text-white px-10 py-20 flex gap-60 relative justify-center">
                <div className="text-center">
                    <h1 className="text-center font-bold text-3xl text-black font-bold">ABOUT US</h1><br/>
                    <p className="w-[700px] h-[400px] text-black">Our platform aims to bring the latest and most popular
                        films from the world of cinema to you. From the newest releases
                        in theaters to the most popular digital content, we offer a wide range of films to provide movie
                        lovers with a rich viewing
                        experience. Our goal is to make it easy for cinema enthusiasts to access content that suits
                        every taste.
                        With the latest releases, user reviews, and recommendations, we help you make the best choice.
                        Enjoy the cinema experience with us!
                        <img src="/images/img4.png" className="w-[400px] h-[200px] justify-center "/></p>


                </div>
            </div>

        </div>

    );
};

export default Layout;