import React from "react";
import errorImage from "../../../assets/errorImage.webp";

const Error404: React.FC = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-start h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${errorImage})` }}
    >

      <div className="mt-80"></div> 

      <div className="relative z-10 text-center text-sky-950 mt-auto mb-0"> 
        <h1 className="text-8xl font-extrabold drop-shadow-lg">404 Error</h1>
        <h2 className="mt-4 text-4xl font-semibold drop-shadow-lg">
          Página no encontrada
        </h2>
        <p className="mt-2 text-lg text-zinc-800 drop-shadow-md">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-8 py-3 bg-sky-900 text-white text-lg font-medium rounded-full shadow-md hover:bg-sky-900 hover:shadow-lg transition-all duration-300"
        >
          Volver Atrás
        </button>
      </div>
    </div>
  );
};

export default Error404;
