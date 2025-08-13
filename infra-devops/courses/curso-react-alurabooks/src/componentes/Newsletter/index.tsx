import { AbCampoTexto } from 'ds-alurabooks'
import { useState } from 'react'
import './Newsletter.css'

const Newsletter = () => {
    const [email, setEmail] = useState('')
    return (<section className='Newsletter'>
        <div>
            <h6>Fique por dentro das novidades!</h6>
            <p>Atualizações de e-books, novos livros, promoções e outros.</p>
        </div>
        <form>
            <AbCampoTexto 
                darkmode={false} 
                value={email}
                onChange={setEmail}
                placeholder="Cadastre seu e-mail"
            />
        </form>
    </section>)
}

export default Newsletter