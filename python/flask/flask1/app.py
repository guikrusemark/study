from typing import Dict, Union

from flask import Flask, flash, redirect, render_template, request, session, url_for
from werkzeug import Response

from src.game import Game
from src.user import User

app: Flask = Flask(__name__)
app.secret_key = "123"

reponse_or_str = Union[Response, str]

# Global variable to document related data
nome: str = 'admin'

document: Dict[str, str] = {'previous_page': 'index',
                            'title': 'Meus Jogos'}

user: Dict[str, User] = {'admin': User(1, 'admin', 'admin@admin.com', 'admin1234'),
                         'Ronaldo': User(2, 'Ronaldo', 'r9@atletico.com', 'gaucho1234'),
                         'Neymar': User(3, 'Neymar', 'ney@psg.com', 'neymar1234')}

logged_username: str = 'admin'


@app.route('/')
def index() -> str:
    user[logged_username].games.sort(key=lambda game: game.name)
    document['title'] = 'Meus jogos'
    document['previous_page'] = 'index'

    return render_template('index.html',
                           title=document['title'],
                           games=user[logged_username].games,
                           user=session.get('user'))


@app.route('/add-game')
def add_game() -> Response | str:
    # If user is not logged in redirect to login page and pass the previous page
    if 'user' not in session or session['user'] is None:
        flash('You need to login first')
        document['title'] = 'Add game'
        document['previous_page'] = 'add-game'

        return redirect(url_for('login',
                                previous_page=document['previous_page']))

    # If user is logged in render the add game page
    return render_template('add_game.html',
                           title=document['title'],
                           games=user[logged_username].games)


@app.route('/save-game', methods=['POST', ])
def save_game() -> Response:
    name = request.form['name']
    category = request.form['category']
    description = request.form['description']

    game = Game(name, category, description)
    user[logged_username].games.append(game)

    return redirect(url_for('index'))


@app.route('/remove-game')
def remove_game() -> reponse_or_str:
    # If user is not logged in redirect to login page and pass the previous page
    if 'user' not in session or session['user'] is None:
        flash('You need to login first')
        document['title'] = 'Remove game'
        document['previous_page'] = 'remove-game'

        return redirect(url_for('login', previous_page=document['previous_page']))

    return render_template('remove_game.html',
                           title=document['title'],
                           games=user[logged_username].games)


@app.route('/delete-game', methods=['POST', ])
def delete_game() -> Response:
    index = request.form['index']
    if index.isnumeric():
        i: int = int(index) - 1
        if 0 <= i < len(user[logged_username].games):
            del user[logged_username].games[i]
    return redirect(url_for('index'))


@app.route('/login')
def login() -> str:
    document['title'] = 'Login'
    if request.args.get('previous_page') is not None:
        document['previous_page'] = str(request.args.get('previous_page'))
    else:
        document['previous_page'] = 'index'

    return render_template('login.html',
                           previous_page=document['previous_page'],
                           title=document['title'])


@app.route('/auth', methods=['POST', ])
def auth() -> Response:
    document['previous_page'] = request.form['previous_page']
    username: str = request.form['username']
    password: str = request.form['password']

    if user[username].check_credentials(password):
        session['user'] = user[username].name
        global logged_username
        logged_username = username
        flash(f'Logged in successfully with user {session["user"]}')

        return redirect(url_for(document['previous_page'].replace('-', '_')))
    else:
        flash('Invalid username or password')

        return redirect(url_for('login', previous_page=document['previous_page']))


@app.route('/logout')
def logout() -> Response:
    flash('Logged out successfully')
    session['user'] = None
    global logged_username
    logged_username = 'admin'

    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
