import style from "./Filtro.module.scss";

function Filtro({
	filtroData,
	setFiltroData,
}: { filtroData: string | null; setFiltroData: (data: string) => void }) {
	return (
		<form className={style.Filtro}>
			<h3 className={style.titulo}>Filtrar por data</h3>
			<input
				type="date"
				name="data"
				className={style.input}
				onChange={(e) => setFiltroData(e.target.value)}
				placeholder="Por data"
				value={filtroData || ""}
			/>
		</form>
	);
}

export default Filtro;
