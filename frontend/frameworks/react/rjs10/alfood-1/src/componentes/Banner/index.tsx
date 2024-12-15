import estilos from "./Banner.module.scss";

const Banner = () => {
	return (
		<section className={estilos.BannerArea}>
			<div className={estilos.Container}>
				<h1 className={estilos.Titulo}>AlFood</h1>
				<p>Felicidade em cada prato.</p>
			</div>
		</section>
	);
};

export default Banner;
