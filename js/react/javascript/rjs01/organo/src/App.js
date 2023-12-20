import { useState } from "react";

import Banner from './components/Banner';
import Form from './components/Form';
import Team from './components/Team';
import Footer from './components/Footer';

function App() {
    
    const teams = [
        {name: "Frontend", color: "#3294c880", backgroundColor: "#3294c823"}, 
        {name:  "Backend", color: "#16800f80", backgroundColor: "#16800f23"}, 
        {name:   "Mobile", color: "#c8873280", backgroundColor: "#c8873223"},
        {name: "Designer", color: "#b432c880", backgroundColor: "#b432c823"},
    ];
    
    const [cards, setCards] = useState([
        {
            name: "Kruze",
            role: "Dev React",
            team: "Designer",
            url: "https://avatars.githubusercontent.com/u/6116219?v=4",
        },
        {
            name: "Bozo",
            role: "DBA",
            team: "Backend",
            url: "https://i0.wp.com/smokebuddies.com.br/wp-content/uploads/2020/09/bolsonaro-maconha-nao-e-agro.jpg?w=900&ssl=1",
        },
        {
            name: "Lule",
            role: "QA",
            team: "Mobile",
            url: "https://i.em.com.br/mB1TZNGO5yw1gGHHvj4Qlb1tgD0=/820x492/smart/imgsapp.em.com.br/app/noticia_127983242361/2022/04/23/1361830/lula-sorri-e-usa-oculos-juliet_1_337581.png",
        },
    ]);

    const registerCard = (card) => {
        setCards([...cards, card]);
    };
        

    return (
        <div className="App">
            <header>
                <Banner />
            </header>
            <main>
                <Form 
                    teams={ teams } 
                    onSubmitHandler={ registerCard } />

                <Team 
                    teams={ teams } 
                    cards={ cards } />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
