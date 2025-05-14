import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from './store.tsx';

export interface Image {
    id: number;
    name: string;
    image: {medium:string; original:string};
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
    movies: Image[];
    favorites: Image[];
    search: string;
    searchResults:Image[];
    currentPage: number;
    itemsPerPage: number;
    selectedFilter: string;
    searchDropdown:boolean;
    loading: boolean;
    showDetail: Image | null;
}

const getCurrentPageFromLocalStorage = () => {
    const currentPage = localStorage.getItem('currentPage');
    return currentPage ? parseInt(currentPage, 10) : 1;
};

const getFavoritesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
};
const initialState: ImageState = {
    movies: [],
    favorites: getFavoritesFromLocalStorage(),
    currentPage: getCurrentPageFromLocalStorage(),
    itemsPerPage:30,
    selectedFilter:'',
    searchResults:[],
    searchDropdown:false,
    loading:false,
    showDetail: null,
    search:"",
};

export const movieSlice = createSlice({
    name: 'image',
    initialState,

    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload;
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
        setShowDetail: (state, action) => {
            state.showDetail = action.payload;
        },
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
    },
});

export const {
    setMovies,
    addFavorite,
    removeFavorite,
    setCurrentPage,
    setSelectedFilter,
    setSearchResults,
    setDropdown,
    closeSearchDropdown,
    setShowDetail,
    setLoading
} = movieSlice.actions;


interface showResult {
    show: {
        id: number;
        name: string;
        image: {
            medium: string;
            original: string;
        } | null;
    };
}

export const fetchSearchResults = (query:string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));

        if (query.trim() === "") {
            dispatch(setSearchResults([]));
            dispatch(setLoading(false));
            return;
        }
        try {
            const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);

            const data = await response.json();
            const results =( data as showResult[]).map((item) => ({
                id:item.show.id,
                name: item.show.name,
                image: item.show.image ?? { medium: '/placeholder.jpg', original: '/placeholder.jpg' },

            }));
            dispatch(setSearchResults(results));
        } catch (error) {
            console.error("apı error", error);
            dispatch(setSearchResults([]));
        }finally {
            dispatch(setLoading(false));
        }
    };
};

export const getShowDetail = (id: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
            const data = await response.json();
            dispatch(setShowDetail({
                id: data.id,
                name: data.name,
                image: data.image?.original ?? '/placeholder.jpg',
                summary: data.summary ?? 'açıklama yok',
                airdate: data.premiered ?? 'yayın tarih bilinmiyor',
                imdbId: data.externals?.imdb ?? '',
                genres: data.genres ?? [],
                language: data.language,
                ended: data.ended ?? 'bilinmiyor',
                status: data.status,
                rating: {average: data.rating?.average ?? null},
                schedule: {
                    time: data.schedule?.time ?? 'bilinmiyor',
                    days: data.schedule?.days ?? [],
                },
            }));

        } catch (error) {
            console.error('Failed to fetch images:', error);
        }
    };
}

export const fetchImages = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await fetch('https://api.tvmaze.com/shows');
            const data = await response.json();
            dispatch(setMovies(
                data.map((item: Image) => ({
                    id: item.id,
                    name: item.name,
                    image:item.image?.original ?? '/placeholder.jpg',
                    summary: item.summary ?? 'açıklama yok',
                    airdate: item.airdate,
                    imdbId: item.imdbId,
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
        } catch (error) {
            console.error('Failed to fetch images:', error);
        }finally {
            dispatch(setLoading(false));
        }
    };
};
export default movieSlice.reducer;