import React from "react";

type LayoutProps = {

};

const Layout: React.FC<LayoutProps> = () => {

    return (
        <div className="relative" >
            <img src="/images/img1.png" alt="homepageimages" className="w-full h-fit filter blur-md "/>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-52">
                <p className=" text-white text-3xl font-bold">Filmin Keyfini Çıkarmaya Var Mısın?</p><br/>
                <button className="px-52 py-3 text-white bg-gradient-to-r from-blue-500 via-blue-600
            to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300
            dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Giriş Yap</button><br/>
                <p className="px-48 py-3 ">Üye Değilsen</p><br/>
                <button className="px-52 py-3 text-white bg-gradient-to-r from-blue-500 via-blue-600
            to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300
            dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Üye Ol</button>
            </div>

        </div>
    );
};

export default Layout;
