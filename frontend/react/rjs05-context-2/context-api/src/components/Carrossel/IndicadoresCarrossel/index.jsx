import React from "react";

const IndicadoresCarrossel = () => {
	return (
		<div className="carousel-indicators">
			<button
				type="button"
				data-bs-target="#carrossel"
				data-bs-slide-to="0"
				className="active"
				aria-current="true"
				aria-label="Slide 1"
			/>
			<button
				type="button"
				data-bs-target="#carrossel"
				data-bs-slide-to="1"
				aria-label="Slide 2"
			/>
			<button
				type="button"
				data-bs-target="#carrossel"
				data-bs-slide-to="2"
				aria-label="Slide 3"
			/>
		</div>
	);
};

export default IndicadoresCarrossel;
