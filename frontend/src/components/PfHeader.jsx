import React from "react";
import Search from "./Search";

const PfHeader = ({name}) => {
    return(
        <>
            <Search />
            <div className="xl:px-32">
                <h1 className="text-5xl">{name}</h1>
            </div>
        </>
    );
};

export default PfHeader;


