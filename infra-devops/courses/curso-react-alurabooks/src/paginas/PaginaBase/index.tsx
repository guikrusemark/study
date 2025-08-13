import { Outlet } from "react-router-dom"
import BarraNavegacao from "../../componentes/BarraNavegacao"
import Rodape from "../../componentes/Rodape"

const PaginaBase = () => {
    return (<main>
        <BarraNavegacao />
        <Outlet />
        <Rodape />
    </main>)
}

export default PaginaBase