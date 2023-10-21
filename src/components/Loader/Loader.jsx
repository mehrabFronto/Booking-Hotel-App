import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
   return (
      <ThreeDots
         height="80"
         width="80"
         radius="9"
         color="#4338ca"
         ariaLabel="three-dots-loading"
         wrapperStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
         }}
         wrapperClassName=""
         visible={true}
      />
   );
};

export default Loader;
