import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages,setSelectedMovie ,addFavorite} from '../redux/imageSlice';
import React, { useEffect } from 'react';
import { RootState, AppDispatch } from '../redux/store';
import { MdOutlineFavoriteBorder} from "react-icons/md";
import AlertModal from '../Compenents/AlertModal.tsx'


const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const images = useSelector((state: RootState) => state.image.images);

    useEffect(() => {
        dispatch(fetchImages());
    }, [dispatch]);

    const handleShowDetails = (movie: { id: number; name: string; image: string; detail: string }) => {
        dispatch(setSelectedMovie(movie));
        navigate('/showdetails');
    };
const handleAddFavorite=(movie: { id: number; name: string; image: string; detail: string })=>{
    dispatch(addFavorite(movie));
}

    return (
        <div>
            <h1 className="text-center text-black text-4xl underline">POPULAR TV SHOWS</h1>
          <AlertModal/>
            <div className="grid grid-cols-5 gap-4">
                {images.map((img) => (
                    <div key={`${img.id}-${img.name}`} className="border p-4 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold text-center">{img.name}</h2>
                        <div>
                        <img src={img.image} alt={img.name} className="w-full h-auto rounded-md" />
                            <MdOutlineFavoriteBorder className="text-4xl hover:text-5xl hover:text-red-700" onClick={()=>(handleAddFavorite(img))}/>
                        </div>
                        <button
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
        hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300
        dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() =>handleShowDetails(img)}>
                            Detayları gör
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
