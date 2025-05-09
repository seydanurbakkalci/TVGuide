import React from "react";
import { FaFacebook,FaInstagram,FaTwitter  } from "react-icons/fa"

const Footer: React.FC = () => {
    return (
        <div className="bg-blue-950 text-white px-10 py-20 flex gap-20 relative flex-col">
            <div className="w-[300px] h-[300px] ">
                <h1 className="font-bold text-2xl text-center">CONTACT US</h1>
                <p>Do you have any questions, suggestions, or feedback? It's easy to get in touch with us!</p><br/>
                <p> Email: [email@example.com]</p><br/>
                <p> Phone: +90 123 456 7890</p><br/>
                <p> We look forward to hearing from you!</p>
            </div>

            <div className="border-t border-gray-300 w-full my-6"></div>

            <div className=" justify-center flex gap-10">
                <FaFacebook className="text-3xl cursor-pointer"/>
                <FaInstagram className="text-3xl cursor-pointer"/>
                <FaTwitter className="text-3xl cursor-pointer"/>
            </div>
        </div>

    );
};

export default Footer;
