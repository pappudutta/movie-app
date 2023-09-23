import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Img = ({ imgSrc, className }) => {
  return (
    <LazyLoadImage
      className={className || ""}
      alt=""
      effect="blur"
      src={imgSrc}
    />
  );
};

export default Img;
