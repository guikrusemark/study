import sliders from "@/mocks/carrossel.json";
import React from "react";
import CarrosselControl from "./CarrosselControl";
import IndicadoresCarrossel from "./IndicadoresCarrossel";
import ItemCarrossel from "./ItemCarrossel";

const Carrossel = () => {
	return (
		<section aria-label="Carrossel">
			<div id="carrossel" className="carousel slide" data-bs-ride="carousel">
				<IndicadoresCarrossel />
				<div className="carousel-inner">
					{sliders.map((slide) => (
						<ItemCarrossel
							key={slide.id}
							src={slide.src}
							alt={slide.alt}
							itemCarrossel={slide.itemCarrossel}
						/>
					))}
				</div>
				<CarrosselControl variante="prev" />
				<CarrosselControl variante="next" />
			</div>
		</section>
	);
};

export default Carrossel;
