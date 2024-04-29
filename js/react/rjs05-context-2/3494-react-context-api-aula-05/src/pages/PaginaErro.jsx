import { Link } from "react-router-dom";
import BarraNavegacao from "@/components/BarraNavegacao";

const PaginaErro = () => {
  return (
    <>
      <BarraNavegacao />
      <div class="d-flex align-items-center justify-content-center vh-100">
        <div class="text-center">
          <h1 class="display-1 fw-bold">404</h1>
          <p class="fs-3">Ops! Página não encontrada</p>
          <p class="lead">
            A página que você está procurando não existe ainda.
          </p>
          <Link to={`/`} class="btn btn-primary">
            Ir para Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaginaErro;
