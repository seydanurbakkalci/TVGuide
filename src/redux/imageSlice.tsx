import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from './store.tsx';

interface Image {
    id: number;
    name: string;
    image: string;
    summary:string;
    airdate:string;

}
interface alertModal{
    message:string,
    isOpen:boolean,
}

interface ImageState {
    images: Image[];
    selectedMovie:Image | null;    //  ya bir ımage objesı yada null olabılır dıkatv et hata vermstı
    favorites:Image[];
    alertModal:alertModal

}

const initialState: ImageState = {
    images: [],
    selectedMovie:null ,
    favorites:[],
    alertModal:{message:"", isOpen:false},

};

export const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setImages: (state, action) => {
            state.images = action.payload;
        },
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },
        addFavorite:(state,action)=>{
if(!state.favorites.find((movie)=>movie.id===action.payload.id)){
    state.favorites.push(action.payload);
    state.alertModal = { message: `${action.payload.name} favorilere eklendi`, isOpen: true };
}
else{
    state.alertModal = { message: `${action.payload.name} önceden favorilere eklenmiş`, isOpen: true };
}
},
        removeFavorite:(state,action)=>{
            const updateFavorites=state.favorites.filter((movie)=>movie.id !== action.payload.id);
            state.favorites=updateFavorites;
            state.alertModal={message: `${action.payload.name} favorilerden çıkarıldı`, isOpen: false };
        },
        closeAlertModal:(state)=>{
            state.alertModal.isOpen=false;
        },

    },

});

export const { setImages ,setSelectedMovie , addFavorite, closeAlertModal ,removeFavorite } = imageSlice.actions;

export const fetchImages = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await fetch('https://api.tvmaze.com/schedule?country=US&date=2014-12-01');
            const data = await response.json();
            console.log(data);
            dispatch(setImages(data.map((item: any) => ({
                id: item.id,
                name: item.show.name,
                image: item.show.image?.original ?? "",
                summary:item.show.summary ?? "açıklama yok",
                airdate:item.airdate ?? "yayın tarih bilinmiyor",

            }))));
        } catch (error) {
            console.error('Failed to fetch images:', error);
        }
    };
};

export default imageSlice.reducer;
