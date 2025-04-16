import {AppDispatch, RootState} from "../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {closeAlertModal} from "../redux/movieSlice.tsx";


const AlertModal =()=>{
    const dispatch=useDispatch<AppDispatch>();
    const{message,isOpen}=useSelector((state:RootState)=>state.image.alertModal);

    if(!isOpen) return null;
    return(
        <div className='justify-items-center' >
            <div className='bg-blue-300 h-20 w-96 justify-items-center'>
                <h2>{message}</h2>
                <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
        hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300
        dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>dispatch(closeAlertModal())}>tamam</button>
            </div>
        </div>
    );
};
export default  AlertModal;