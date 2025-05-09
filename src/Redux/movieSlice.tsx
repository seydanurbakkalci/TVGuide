import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from './store.tsx';

export interface Image {
    id: number;
    name: string;
    image: string;
    summary: string;
    airdate: string;
    imdbId: string;
    genres: string[];
    language: string;
    ended: string;
    rating: { average: number | null };
    schedule: { time: string; days: string[] };
    status: string;
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
    selectedImage:Image|null;
    searchResults:Image[];
    searchDropdown:boolean;


}


const getCurrentPageFromLocalStorage = () => {
    const currentPage = localStorage.getItem('currentPage');
    return currentPage ? parseInt(currentPage, 10) : 1;
};


const getFavoritesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
};

const initialState: ImageState = {
    images: [],
    selectedMovie:null,
    favorites: getFavoritesFromLocalStorage(),
    currentPage: getCurrentPageFromLocalStorage(),
    itemsPerPage:30,
    selectedFilter:'',
    genres: [],
    selectedImage:null,
    searchResults:[],
    searchDropdown:false,
    scrollPosition: 0,
    visibleImages: [],
    loading:false,

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
        setSelectedImage: (state, action) => {
            state.selectedImage = action.payload;
        },
        addFavorite: (state, action) => {
            if (!state.favorites.find((movie) => movie.id === action.payload.id)) {
                state.favorites.push(action.payload);
                localStorage.setItem('favorites',JSON.stringify(state.favorites));
            }
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter((movie) => movie.id !== action.payload.id);
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
            localStorage.setItem('currentPage',action.payload.toString());

        },
        setSelectedFilter: (state, action) => {
            state.selectedFilter = action.payload;
       localStorage.setItem('selectedFilter',action.payload);
        },
        setSearchResults:(state,action)=>{
            state.searchResults=action.payload;
        },
        setDropdown:(state,action)=>{
            state.searchDropdown = action.payload;
        },

        closeSearchDropdown:(state)=>{
            state.searchDropdown=false;
        },
        setScrollPosition: (state, action) => {
            state.scrollPosition = action.payload;
            state.visibleImages = state.images.slice(action.payload, action.payload + 6);
        },
        setVisibleImages: (state) => {
            state.visibleImages = state.images.slice(state.scrollPosition, state.scrollPosition + 6);
        },

    },
});

export const {
    setImages,
    setGenres,
    setSelectedMovie,
    setSelectedImage,
    addFavorite,
    removeFavorite,
    setCurrentPage,
    setSelectedFilter,
    setSearchResults,
    setDropdown,
    closeSearchDropdown,
    setScrollPosition,
    setVisibleImages,
} = movieSlice.actions;

export const fetchSearchResults = (query:string) => {
    return async (dispatch: AppDispatch) => {
        if (query.trim() === "") {
            dispatch(setSearchResults([]));
            return;
        }

        try {
            const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);

            const data = await response.json();
            const results = data.map((item: any) => ({
                id: item.show.id,
                name: item.show.name,
                image: item.show.image?.original ?? '/placeholder.jpg',
                summary: item.show.summary ?? 'açıklama yok',
                airdate: item.show.premiered ?? 'yayın tarih bilinmiyor',
                imdbId: item.show.externals?.imdb ?? '',
                genres: item.show.genres.join(', '),
                language: item.show.language,
                ended: item.show.ended,
            }));
            dispatch(setSearchResults(results.slice(0, 10)));
        } catch (error) {
            console.error("apı error", error);
            dispatch(setSearchResults([]));
        }
        };
    };

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
                    genres: item.genres ?? [],
                    language: item.language,
                    ended: item.ended ?? 'bilinmiyor',
                    status: item.status,
                    rating: {average: item.rating?.average ?? null},
                    schedule: {
                        time: item.schedule?.time ?? 'bilinmiyor',
                        days: item.schedule?.days ?? [],
                    },
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