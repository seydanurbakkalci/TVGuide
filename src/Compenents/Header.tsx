import React from "react";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import {useNavigate} from "react-router-dom";

type HeaderProps = {
    title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {

    const navigate=useNavigate();
    return (
        <header className="bg-blue-950 text-white h-20 px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold px-4 hover:text-2xl hover:text-blue-300 " onClick={()=>navigate("/")}>{title}</h1>
                <input
                    type="search"
                    placeholder="Search for..."
                    className="text-lg text-black h-10 w-96 px-4 rounded-md"
                />
            </div>

            <div className="px-4 py-2 text-3xl flex gap-4">
                <IoHomeOutline className="hover:text-4xl hover:text-blue-300" onClick={()=>navigate("/homepage")}/>
                <IoMdTime className="hover:text-4xl hover:text-blue-300"/>
                <MdOutlineFavoriteBorder className="hover:text-4xl hover:text-blue-300 "onClick={()=>navigate("/Favorites ")}/>
                <MdOutlineDarkMode className="hover:text-4xl hover:text-blue-300"/>
                <VscAccount className="hover:text-4xl hover:text-blue-300"/>
            </div>
        </header>
    );
};

export default Header;
