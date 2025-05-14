import {useSelector} from "react-redux";
import {RootState} from "../redux/store.tsx";
import React from 'react';

const Loading: React.FC = () => {

    const loading =useSelector((state:RootState)=>state.image.loading);

      if(!loading) return null;
    return (
        <div className="react-loading-skeleton" >
           <p>yükleniyor...</p>
        </div>
    );
};

export default Loading;