import { v4 as uuid } from "uuid";

import "./lista-suspensa.css";

const ListaSuspensa = ({
	label,
	items,
	valor,
	aoAlterado,
	obrigatorio = false,
}) => {
	return (
		<div className="lista-suspensa">
			<label>{label}</label>
			<select
				required={obrigatorio}
				value={valor}
				onChange={(evento) => aoAlterado(evento.target.value)}
			>
				{items.map((item, index) => (
					<option key={uuid()}>{item}</option>
				))}
			</select>
		</div>
	);
};

export default ListaSuspensa;
