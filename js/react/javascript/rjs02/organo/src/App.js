import { useState } from "react";
import Banner from "./componentes/Banner";
import Formulario from "./componentes/Formulario";
import Rodape from "./componentes/Rodape";
import Time from "./componentes/Time";
import {v4 as uuid} from 'uuid';

function App() {

  const [times, setTimes] = useState([
      {
          id: uuid(),
          nome: "Programação",
          cor: "#57C278",
      },
      {
          id: uuid(),
          nome: "Front-End",
          cor: "#82CFFA",
      },
      {
          id: uuid(),
          nome: "Data Science",
          cor: "#A6D157",
      },
      {
          id: uuid(),
          nome: "Devops",
          cor: "#E06B69",
      },
      {
          id: uuid(),
          nome: "UX e Design",
          cor: "#DB6EBF",
      },
      {
          id: uuid(),
          nome: "Mobile",
          cor: "#FFBA05",
      },
      {
          id: uuid(),
          nome: "Inovação e Gestão",
          cor: "#FF8A29",
      },
  ]);

  const [colaboradores, setColaboradores] = useState([
      {
          id: uuid(),
          nome: "JULIANA AMOASEI",
          cargo: "Desenvolvedora de software e instrutora",
          imagem: "https://www.alura.com.br/assets/img/lideres/juliana-amoasei.1647533644.jpeg",
          favorito: false,
          time: times[0].nome,
      },
      {
          id: uuid(),
          nome: "DANIEL ARTINE",
          cargo: "Engenheiro de Software na Stone Age",
          imagem: "https://www.alura.com.br/assets/img/lideres/daniel-artine.1647533644.jpeg",
          favorito: false,
          time: times[0].nome,
      },
      {
          id: uuid(),
          nome: "GUILHERME LIMA",
          cargo: "Desenvolvedor Python e JavaScript na Alura",
          imagem: "	https://www.alura.com.br/assets/img/lideres/guilherme-lima.1647533644.jpeg",
          favorito: false,
          time: times[0].nome,
      },
      {
          id: uuid(),
          nome: "PAULO SILVEIRA",
          cargo: "Hipster e CEO da Alura",
          imagem: "https://www.alura.com.br/assets/img/lideres/paulo-silveira.1647533644.jpeg",
          favorito: false,
          time: times[0].nome,
      },
      {
          id: uuid(),
          nome: "JULIANA AMOASEI",
          cargo: "Desenvolvedora de software e instrutora",
          imagem: "https://www.alura.com.br/assets/img/lideres/juliana-amoasei.1647533644.jpeg",
          favorito: false,
          time: times[1].nome,
      },
      {
          id: uuid(),
          nome: "DANIEL ARTINE",
          cargo: "Engenheiro de Software na Stone Age",
          imagem: "https://www.alura.com.br/assets/img/lideres/daniel-artine.1647533644.jpeg",
          favorito: false,
          time: times[1].nome,
      },
      {
          id: uuid(),
          nome: "GUILHERME LIMA",
          cargo: "Desenvolvedor Python e JavaScript na Alura",
          imagem: "	https://www.alura.com.br/assets/img/lideres/guilherme-lima.1647533644.jpeg",
          favorito: false,
          time: times[1].nome,
      },
      {
          id: uuid(),
          nome: "PAULO SILVEIRA",
          cargo: "Hipster e CEO da Alura",
          imagem: "https://www.alura.com.br/assets/img/lideres/paulo-silveira.1647533644.jpeg",
          favorito: false,
          time: times[1].nome,
      },
      {
          id: uuid(),
          nome: "JULIANA AMOASEI",
          cargo: "Desenvolvedora de software e instrutora",
          imagem: "https://www.alura.com.br/assets/img/lideres/juliana-amoasei.1647533644.jpeg",
          favorito: false,
          time: times[2].nome,
      },
      {
          id: uuid(),
          nome: "DANIEL ARTINE",
          cargo: "Engenheiro de Software na Stone Age",
          imagem: "https://www.alura.com.br/assets/img/lideres/daniel-artine.1647533644.jpeg",
          favorito: false,
          time: times[2].nome,
      },
      {
          id: uuid(),
          nome: "GUILHERME LIMA",
          cargo: "Desenvolvedor Python e JavaScript na Alura",
          imagem: "	https://www.alura.com.br/assets/img/lideres/guilherme-lima.1647533644.jpeg",
          favorito: false,
          time: times[2].nome,
      },
      {
          id: uuid(),
          nome: "PAULO SILVEIRA",
          cargo: "Hipster e CEO da Alura",
          imagem: "https://www.alura.com.br/assets/img/lideres/paulo-silveira.1647533644.jpeg",
          favorito: false,
          time: times[2].nome,
      },
      {
          id: uuid(),
          nome: "JULIANA AMOASEI",
          cargo: "Desenvolvedora de software e instrutora",
          imagem: "https://www.alura.com.br/assets/img/lideres/juliana-amoasei.1647533644.jpeg",
          favorito: false,
          time: times[3].nome,
      },
      {
          id: uuid(),
          nome: "DANIEL ARTINE",
          cargo: "Engenheiro de Software na Stone Age",
          imagem: "https://www.alura.com.br/assets/img/lideres/daniel-artine.1647533644.jpeg",
          favorito: false,
          time: times[3].nome,
      },
      {
          id: uuid(),
          nome: "GUILHERME LIMA",
          cargo: "Desenvolvedor Python e JavaScript na Alura",
          imagem: "	https://www.alura.com.br/assets/img/lideres/guilherme-lima.1647533644.jpeg",
          favorito: false,
          time: times[3].nome,
      },
      {
          id: uuid(),
          nome: "PAULO SILVEIRA",
          cargo: "Hipster e CEO da Alura",
          imagem: "https://www.alura.com.br/assets/img/lideres/paulo-silveira.1647533644.jpeg",
          favorito: false,
          time: times[3].nome,
      },
      {
          id: uuid(),
          nome: "JULIANA AMOASEI",
          cargo: "Desenvolvedora de software e instrutora",
          imagem: "https://www.alura.com.br/assets/img/lideres/juliana-amoasei.1647533644.jpeg",
          favorito: false,
          time: times[4].nome,
      },
      {
          id: uuid(),
          nome: "DANIEL ARTINE",
          cargo: "Engenheiro de Software na Stone Age",
          imagem: "https://www.alura.com.br/assets/img/lideres/daniel-artine.1647533644.jpeg",
          favorito: false,
          time: times[4].nome,
      },
      {
          id: uuid(),
          nome: "GUILHERME LIMA",
          cargo: "Desenvolvedor Python e JavaScript na Alura",
          imagem: "	https://www.alura.com.br/assets/img/lideres/guilherme-lima.1647533644.jpeg",
          favorito: false,
          time: times[4].nome,
      },
      {
          id: uuid(),
          nome: "PAULO SILVEIRA",
          cargo: "Hipster e CEO da Alura",
          imagem: "https://www.alura.com.br/assets/img/lideres/paulo-silveira.1647533644.jpeg",
          favorito: false,
          time: times[4].nome,
      },
      {
          id: uuid(),
          nome: "JULIANA AMOASEI",
          cargo: "Desenvolvedora de software e instrutora",
          imagem: "https://www.alura.com.br/assets/img/lideres/juliana-amoasei.1647533644.jpeg",
          favorito: false,
          time: times[5].nome,
      },
      {
          id: uuid(),
          nome: "DANIEL ARTINE",
          cargo: "Engenheiro de Software na Stone Age",
          imagem: "https://www.alura.com.br/assets/img/lideres/daniel-artine.1647533644.jpeg",
          favorito: false,
          time: times[5].nome,
      },
      {
          id: uuid(),
          nome: "GUILHERME LIMA",
          cargo: "Desenvolvedor Python e JavaScript na Alura",
          imagem: "	https://www.alura.com.br/assets/img/lideres/guilherme-lima.1647533644.jpeg",
          favorito: false,
          time: times[5].nome,
      },
      {
          id: uuid(),
          nome: "PAULO SILVEIRA",
          cargo: "Hipster e CEO da Alura",
          imagem: "https://www.alura.com.br/assets/img/lideres/paulo-silveira.1647533644.jpeg",
          favorito: false,
          time: times[5].nome,
      },
  ]);


  const aoDeletar = (id, time) => {
      console.log(`Deletando colaborador ${id} ${time}`);
      const novosColaboradores = colaboradores.filter(colaborador => 
        colaborador.id !== id || colaborador.time !== time);
      setColaboradores(novosColaboradores);  
  };

  function aoMudarCor(id, cor) {
    setTimes(times.map(time => {
      if (id === time.id) {
        time.cor = cor;
      }
      return time;
    }));
  }
  
  function aoFavoritar(id, setBool) {
    setColaboradores(colaboradores.map(colaborador => {
      if (id === colaborador.id) {
        colaborador.favorito = setBool;
      }
      return colaborador;
    }));
  }

  return (
    <div>
      <Banner />
      <Formulario times={times.map(time => time.nome)} 
        aoCadastrarColaborador={colaborador => setColaboradores([...colaboradores, colaborador])}
        aoCadastrarTime={time => setTimes([...times, time])} />
      <section className="times">
        <h1>Minha organização</h1>
          {times.map((time) => 
            <Time key={time.id} 
              time={time} 
              colaboradores={colaboradores.filter(colaborador => colaborador.time === time.nome)}
              aoMudarCor={ aoMudarCor }
              aoDeletar={ aoDeletar }
              aoFavoritar={ aoFavoritar } />)}
      </section>
      <Rodape />
    </div>
  );
}

export default App;









































