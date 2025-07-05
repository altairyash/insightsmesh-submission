import React from "react";

interface BannerProps {
  message: string;
  onDismiss: () => void;
}

const Banner: React.FC<BannerProps> = ({ message, onDismiss }) => {
  return (
    <div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-md shadow-lg flex gap-4"
      style={{ zIndex: 1000 }}
    >
      <p>{message}</p>
      <button
        className="bg-white text-blue-500 px-3 py-1 rounded-md"
        onClick={onDismiss}
      >
        Dismiss
      </button>
    </div>
  );
};

export default Banner;
