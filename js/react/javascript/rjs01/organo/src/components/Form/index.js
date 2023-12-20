import './Form.css';

import { useState } from "react";

import TextInput from '../TextInput';
import DropdownList from "../DropdownList";
import ButtonForm from "../ButtonForm";

const Form = (props) => {
    
    const addCard = (event) => {
        event.preventDefault();
        props.onSubmitHandler({ name: name, role: role, team: team, url: url});
    };

    // Setting states of card infos
    const [name, setName] = useState('Putin');
    const [role, setRole] = useState('Czar Moderno');
    const [team, setTeam] = useState(props.teams[0].name);
    const [url, setUrl] = useState('https://i.pinimg.com/222x/c4/cc/86/c4cc864a67d4a5a93435a6a775454aef.jpg');

    return (
        <section className="formulario">
            <form onSubmit={addCard}>
                <h2>Adicione os Cards</h2>
                <TextInput
                    label="nome"
                    required={true}
                    value={name}
                    onChangeHandler={(value) => setName(value)}
                />
                <TextInput
                    label="cargo"
                    value={role}
                    onChangeHandler={(value) => setRole(value)}
                />
                <DropdownList
                    label="tipo de usuário"
                    optionItems={props.teams.map(team => team.name)}
                    value={team}
                    onChangeHandler={(value) => setTeam(value)}
                />
                <TextInput
                    label="URL imagem"
                    value={url}
                    onChangeHandler={(value) => setUrl(value)}
                />
                <ButtonForm type="submit">Adicionar card</ButtonForm>
            </form>
        </section>
    );
};

export default Form;
