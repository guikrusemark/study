import React from "react";
import "./Banner.css";

interface BannerProps {
	enderecoImagem: string;
	textoAlternativo?: string;
}

export const Banner = ({ enderecoImagem, textoAlternativo }: BannerProps) => {
	// JSX
	return (
		<header className="banner">
			<img
				src="/imagens/banner.png"
				alt="O banner principal da página do Organo"
			/>
		</header>
	);
};

export default Banner;
