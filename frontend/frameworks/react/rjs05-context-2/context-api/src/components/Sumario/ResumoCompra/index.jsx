import useCartContext from "@/hooks/useCartContext";

import Titulo from "@/components/Titulo";
import ValorFormatado from "@/components/ValorFormatado";

import { formatadorMoeda } from "@/utils/formatadorMoeda";

const ResumoCompra = () => {
	const { carrinho, getTotalValue, countItems } = useCartContext();

	return (
		<div className="bg-black p-4">
			<Titulo element="h5" className="text-center fw-bold">
				Sumário
			</Titulo>
			<div className="d-flex flex-row justify-content-between">
				<p className="m-0">{countItems(carrinho)} produtos</p>
				<span>{formatadorMoeda(getTotalValue(carrinho))}</span>
			</div>
			<div className="divisor__verde my-3" />
			<div className="d-flex flex-row justify-content-between">
				<p className="verde-limao m-0">Total</p>
				<ValorFormatado
					className="verde-limao"
					valor={getTotalValue(carrinho)}
				/>
			</div>
		</div>
	);
};

export default ResumoCompra;
