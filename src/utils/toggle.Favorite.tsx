import { AppDispatch } from "../redux/store";
import { addFavorite, removeFavorite } from "../redux/movieSlice";
import { toast } from "react-toastify";


export const toggleFavorite = (dispatch: AppDispatch, favorites: any[], img: any) => {
    const isFavorited = favorites.some((fav) => fav.id === img.id);

    if (isFavorited) {
        dispatch(removeFavorite(img));
        toast.error(`${img.name} favorilerden çıkarıldı`, {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
        });
    } else {
        dispatch(addFavorite(img));
        toast.success(`${img.name} favorilere eklendi`, {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
        });

    }
};


