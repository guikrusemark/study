import { formatadorMoeda } from "@/utils/formatadorMoeda";
import React from "react";

const ValorFormatado = ({ valor }) => {
	return (
		<span
			className="verde-limao text-center text-md-start fw-bold fs-5"
			aria-label="Valor do produto"
		>
			{valor > 0 ? formatadorMoeda(valor) : "00,00"}
		</span>
	);
};

export default ValorFormatado;