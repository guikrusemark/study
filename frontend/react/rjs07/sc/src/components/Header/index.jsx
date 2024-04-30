import { StyledHeader, StyledLogin, StyledNav } from "./styled-components";

import { useNavigate } from "react-router-dom";

export default function Header() {
	const navigateTo = useNavigate();

	return (
		<StyledHeader>
			<img
				src="assets/icons/logo_horizontal_transparente.png"
				alt="logo canil krusemark"
				onClick={() => navigateTo("/")}
			/>
			<StyledNav>
				<ul>
					<li onClick={() => navigateTo("/")}>HOME</li>
					<li onClick={() => navigateTo("/about")}>SOBRE</li>
					<li onClick={() => navigateTo("/")}>CONTATO</li>
					<li onClick={() => navigateTo("/")}>
						<StyledLogin />
					</li>
				</ul>
			</StyledNav>
		</StyledHeader>
	);
}
