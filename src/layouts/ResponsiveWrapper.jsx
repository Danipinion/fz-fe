import React, { useEffect, useState } from "react";

const ResponsiveWrapper = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 450);
  };

  useEffect(() => {
    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        children
      ) : (
        <div className="text-black text-3xl font-bold flex items-center justify-center h-screen">
          <h2>Mobile Only</h2>
        </div>
      )}
    </>
  );
};

export default ResponsiveWrapper;
