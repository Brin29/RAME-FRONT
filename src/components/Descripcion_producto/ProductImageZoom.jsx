import React, { useState } from "react";

const ProductImageZoom = ({ imgSrc, imgAlt }) => {
  const [zoomData, setZoomData] = useState({
    isZoomed: false,
    zoomX: "0%",
    zoomY: "0%",
  });

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { clientWidth, clientHeight } = target;

    const zoomX = `${(offsetX / clientWidth) * 100}%`;
    const zoomY = `${(offsetY / clientHeight) * 100}%`;

    setZoomData((prev) => ({ ...prev, zoomX, zoomY }));
  };

  const handleMouseEnter = () => {
    setZoomData((prev) => ({ ...prev, isZoomed: true }));
  };

  const handleMouseLeave = () => {
    setZoomData((prev) => ({ ...prev, isZoomed: false }));
  };

  return (
    <div
      className={`relative overflow-hidden w-[500px] h-[500px] rounded-lg bg-gray-200 transition-all duration-300 cursor-zoom-in ${zoomData.isZoomed ? 'bg-cover' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: zoomData.isZoomed ? "200%" : "cover",
        backgroundPosition: `${zoomData.zoomX} ${zoomData.zoomY}`,
      }}
    >
      <img
        src={imgSrc}
        alt={imgAlt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${zoomData.isZoomed ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};

export default ProductImageZoom;
