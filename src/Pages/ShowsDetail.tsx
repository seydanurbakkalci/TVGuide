import {useSelector} from "react-redux";
import{RootState} from '../redux/store';
import {useNavigate} from "react-router-dom";
import React from "react";

const ShowsDetail:React.FC=()=> {
    const selectedMovie = useSelector((state: RootState) => state.image.selectedMovie);
    const navigate = useNavigate();


    if (!selectedMovie){
        return <p>yükleniyor</p>
    }
    return (
        <div className="flex justify-center items-center">
            <img className='px-10 py-14 max-w-96 w-96' src={selectedMovie.image} alt={selectedMovie.name}/>
            <div className='py-40'>
                <h1 className='text-center border '><strong>Film adı </strong>{selectedMovie.name}</h1><br/>
                <p className='border'><strong>AÇIKLAMA:</strong>{selectedMovie.summary}</p><br/>
                <p className='border'><strong>YAYIN TARİHİ:</strong>{selectedMovie.airdate}</p><br/>

                <div className="flex justify-center">
                    <button
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
        hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300
        dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                        onClick={() => navigate('/homepage')}
                    >
                        GERİ DÖN
                    </button>
                </div>
            </div>
        </div>

    );
};
export default ShowsDetail;