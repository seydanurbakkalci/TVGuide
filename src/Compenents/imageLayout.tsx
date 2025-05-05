import React from "react";


const imageLayout: React.FC = () => {
    return (
        <div className="relative min-h-screen">
            <img
                src="/images/img1.png"
                alt="homepageimage"
                className="w-full h-[40vh] sm:h-[50vh] object-cover filter blur-md"
            />

        </div>
    );
};

export default imageLayout;
