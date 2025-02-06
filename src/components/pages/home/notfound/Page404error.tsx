import '@/app.css'; 
import { IarrowLeft } from "@/components/icons/IarrowLeft"; 
import Tipografy from '../../../Tipografy';

const Page404Error = () => {
  return (
      <div className="error-404-container">
          <img
              src="/errorImage.webp"
              alt="Error Background"
              className="error-404-image"
          />
          <div className="custom-title">404 Error</div>
          <p className="subtitle">Página no encontrada</p>
          <Tipografy as="div" className="error-message">
  Lo sentimos, la página que buscas no existe o ha sido movida.
</Tipografy>


<button
  onClick={() => window.history.back()}
  className="error-404-button flex items-center gap-2"
>
  <IarrowLeft /> 
  <span>Volver Atrás</span>
</button>

      </div>
  );
};
export default Page404Error;
