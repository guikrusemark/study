import { Route, Routes } from "react-router-dom"
import AreaLogada from "../paginas/AreaLogada"
import Home from "../paginas/Home"
import PaginaBase from "../paginas/PaginaBase"
import Pedidos from "../paginas/Pedidos"


const Rotas = () => {
    return (<Routes>
      <Route path='/' element={<PaginaBase />}>
        <Route path='/' element={<Home />} />
        <Route path='/minha-conta' element={<AreaLogada />}>
            <Route path="pedidos" element={<Pedidos />} />
         </Route>
      </Route>
    </Routes>)
}

export default Rotas