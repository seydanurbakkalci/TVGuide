import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from './store.tsx';

 export interface Image {
    id: number;
    name: string;
    image: string;
    summary: string;
    airdate: string;
    imdbId: string;
    genres:string;
    language:string;
    ended:string;
}

interface ImageState {
    images: Image[];
    selectedMovie: Image | null;
    favorites: Image[];
    search: string;
    currentPage: number;
    itemsPerPage: number;
    selectedFilter: string;
    genres: string[];

}

const initialState: ImageState = {
    images: [],
    selectedMovie:null,
    favorites: [],
    search: '',
    currentPage:1,
    itemsPerPage:30,
    selectedFilter:'',
    genres: [],

};

export const movieSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setImages: (state, action) => {
            state.images = action.payload;
            },
        setGenres: (state, action) => {
            state.genres = action.payload;
        },
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },
        addFavorite: (state, action) => {
            if (!state.favorites.find((movie) => movie.id === action.payload.id)) {
                state.favorites.push(action.payload);
            }
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter((movie) => movie.id !== action.payload.id);
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSelectedFilter: (state, action) => {
            state.selectedFilter = action.payload;
        },
    },
});

export const {
    setImages,
    setGenres,
    setSelectedMovie,
    addFavorite,
    removeFavorite,
    setSearch,
    setCurrentPage,
    setSelectedFilter
} = movieSlice.actions;

export const fetchImages = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await fetch('https://api.tvmaze.com/shows');
            const data = await response.json();
            dispatch(setImages(
                data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    image: item.image?.original ?? '/placeholder.jpg',
                    summary: item.summary ?? 'açıklama yok',
                    airdate: item.premiered ?? 'yayın tarih bilinmiyor',
                    imdbId: item.externals?.imdb ?? '',
                    genres: item.genres.join(', '),
                    language:item.language,
                    ended:item.ended,
                    status:item.status,
                    rating:item.rating ?? 'bilinmiyo',
                }))
            ));
            const genres = Array.from(new Set(data.flatMap((item: any) => item.genres)));dispatch(setGenres(genres));
            dispatch(setGenres([...new Set(genres)]));
        } catch (error) {
            console.error('Failed to fetch images:', error);
        }
    };
};

export default movieSlice.reducer;
