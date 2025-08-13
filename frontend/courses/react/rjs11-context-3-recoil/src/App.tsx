import { RecoilRoot } from "recoil";

import style from "@/App.module.scss";

import Calendario from "@/components/Calendario";
import Card from "@/components/Card";
import Formulario from "@/components/Formulario";
import ListaDeEventos from "@/components/ListaDeEventos";

function App() {
	return (
		<RecoilRoot>
			<div className={style.App}>
				<div className={style.Coluna}>
					<Card>
						<Formulario />
					</Card>
					<Card>
						<ListaDeEventos />
					</Card>
				</div>
				<div className={style.Coluna}>
					<Calendario />
				</div>
			</div>
		</RecoilRoot>
	);
}

export default App;
