import { IoHomeOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import Search from "./Search.tsx";

const Header: React.FC = () => {
    return (
        <header className="bg-blue-950 text-white px-4 py-2 flex flex-wrap lg:flex-nowrap items-center justify-between relative gap-2">
            <div className="flex items-center gap-4 flex-wrap relative w-full lg:w-auto">
                <Link
                    to="/"
                    className="text-xl font-bold  hover:text-blue-300 cursor-pointer"
                >
                    <img src="/images/img4.png" className="h-13 w-20" />
                </Link>
                <Search/>
            </div>


            <div className="flex justify-center lg:justify-end items-center gap-4 w-full lg:w-auto text-2xl mt-2 lg:mt-0">
                <Link
                    to="/homepage"
                    className="flex items-center gap-1 hover:text-blue-300 cursor-pointer"
                >
                    <IoHomeOutline />
                    <p className="text-base lg:text-xl">HomePage</p>
                </Link>

                <Link
                    to="/favorites"
                    className="flex items-center gap-1 hover:text-blue-300 cursor-pointer"
                >
                    <MdFavoriteBorder />
                    <p className="text-base lg:text-xl">Favorites</p>
                </Link>
            </div>
        </header>
    );
};

export default Header;
