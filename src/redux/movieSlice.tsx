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
    alertModal:alertModal;
    search: string;

}

const initialState: ImageState = {
    images: [],
    selectedMovie:null ,
    favorites:[],
    alertModal:{message:"", isOpen:false},
    search:"",

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
        setSearch:(state,action)=>{
            state.search=action.payload;
        }

    },

});

export const { setImages ,setSelectedMovie , addFavorite, closeAlertModal ,removeFavorite , setSearch} = imageSlice.actions;

export const fetchImages = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await fetch('https://api.tvmaze.com/shows');
            const data = await response.json();
            console.log(data);
            dispatch(setImages(data.map((item: any) => ({
                id: item.id,
                name: item.name,
                image: item.image?.original ?? "/placeholder.jpg",
                summary:item.summary ?? "açıklama yok",
                airdate:item.premiered ?? "yayın tarih bilinmiyor",

            }))));
        } catch (error) {
            console.error('Failed to fetch images:', error);
        }
    };
};

export default imageSlice.reducer;
