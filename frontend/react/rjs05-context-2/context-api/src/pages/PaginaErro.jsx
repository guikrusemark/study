import BarraNavegacao from "@/components/BarraNavegacao";
import { Link } from "react-router-dom";

const PaginaErro = () => {
	return (
		<>
			<BarraNavegacao />
			<div className="d-flex align-items-center justify-content-center vh-100">
				<div className="text-center">
					<h1 className="display-1 fw-bold">404</h1>
					<p className="fs-3">Ops! Página não encontrada</p>
					<p className="lead">
						A página que você está procurando não existe ainda.
					</p>
					<Link to={"/"} className="btn btn-primary">
						Ir para Home
					</Link>
				</div>
			</div>
		</>
	);
};

export default PaginaErro;
