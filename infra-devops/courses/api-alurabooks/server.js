const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./database.json')
let userdb = JSON.parse(fs.readFileSync('./usuarios.json', 'UTF-8'))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'

function createToken(payload, expiresIn = '12h') {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

function usuarioExiste({ email, senha }) {
  return userdb.usuarios.findIndex(user => user.email === email && user.senha === senha) !== -1
}

function emailExiste(email) {
  return userdb.usuarios.findIndex(user => user.email === email) !== -1
}

server.post('/public/registrar', (req, res) => {
  const { email, senha, nome, endereco, complemento, cep } = req.body;

  if (emailExiste(email)) {
    const status = 401;
    const message = 'E-mail já foi utilizado!';
    res.status(status).json({ status, message });
    return
  }

  fs.readFile("./usuarios.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({ status, message })
      return
    };

    const json = JSON.parse(data.toString());

    const last_item_id = json.usuarios.length > 0 ? json.usuarios[json.usuarios.length - 1].id : 0;

    json.usuarios.push({ id: last_item_id + 1, email, senha, nome, endereco, complemento, cep });
    fs.writeFile("./usuarios.json", JSON.stringify(json), (err) => {
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({ status, message })
        return
      }
    });
    userdb = json
  });

  const access_token = createToken({ email, senha })
  res.status(200).json({ access_token })
})

server.post('/public/login', (req, res) => {
  const { email, senha } = req.body;
  if (!usuarioExiste({ email, senha })) {
    const status = 401
    const message = 'E-mail ou senha incorretos!'
    res.status(status).json({ status, message })
    return
  }
  const access_token = createToken({ email, senha })
  let user = { ...userdb.usuarios.find(user => user.email === email && user.senha === senha) }
  delete user.senha
  res.status(200).json({ access_token, user })
})

server.get('/public/lancamentos', (req, res) => {
  res.status(200).json([
    {
      "id": 4,
      "categoria": 3,
      "titulo": "Bootstrap 4",
      "slug": "bootstrap-4",
      "descricao": "Conheça a biblioteca front-end mais utilizada no mundo",
      "isbn": "978-85-94188-60-1",
      "numeroPaginas": 172,
      "publicacao": "2018-05-01",
      "imagemCapa": "https://raw.githubusercontent.com/viniciosneves/alurabooks/curso-novo/public/imagens/livros/bootstrap4.png",
      "autor": 4,
      "opcoesCompra": [
        {
          "id": 1,
          "titulo": "E-book",
          "preco": 29.9,
          "formatos": [
            ".pdf",
            ".pub",
            ".mob"
          ]
        },
        {
          "id": 2,
          "titulo": "Impresso",
          "preco": 39.9
        },
        {
          "id": 3,
          "titulo": "E-book + Impresso",
          "preco": 59.9,
          "formatos": [
            ".pdf",
            ".pub",
            ".mob"
          ]
        }
      ],
      "sobre": "Fazer um site elegante nunca foi tão fácil, mesmo para quem não sabe escrever uma linha de CSS e, muito menos, entende como harmonizar cores, balancear elementos e tipografia. O Bootstrap é, resumidamente, um grande arquivo CSS com uma excelente documentação, que possui dezenas e dezenas de componentes prontos. No começo, foi criado pelo Twitter para servir como um guia de estilos em CSS da empresa; hoje, é a biblioteca mais famosa e utilizada no mundo."
    },
    {
      "id": 5,
      "categoria": 3,
      "titulo": "Cangaceiro JavaScript",
      "slug": "cangaceiro-javascript",
      "descricao": "Uma aventura no sertão da programação",
      "isbn": "978-85-94188-00-7",
      "numeroPaginas": 502,
      "publicacao": "2017-08-01",
      "imagemCapa": "https://raw.githubusercontent.com/viniciosneves/alurabooks/curso-novo/public/imagens/livros/cangaceirojavascript.png",
      "autor": 5,
      "opcoesCompra": [
        {
          "id": 1,
          "titulo": "E-book",
          "preco": 29.9,
          "formatos": [
            ".pdf",
            ".pub",
            ".mob"
          ]
        },
        {
          "id": 2,
          "titulo": "Impresso",
          "preco": 39.9
        },
        {
          "id": 3,
          "titulo": "E-book + Impresso",
          "preco": 59.9,
          "formatos": [
            ".pdf",
            ".pub",
            ".mob"
          ]
        }
      ],
      "sobre": "Talvez nenhuma outra linguagem tenha conseguido invadir o coletivo imaginário dos desenvolvedores como JavaScript fez. Em sua história fabular em busca de identidade, foi a única que conseguiu se enraizar nos navegadores, tornando-se uma linguagem em que todo desenvolvedor precisa ter algum nível de conhecimento."
    },
    {
      "id": 6,
      "categoria": 3,
      "titulo": "CSS Eficiente  ",
      "slug": "css-eficiente",
      "descricao": "Técnicas e ferramentas que fazem a diferença nos seus estilos",
      "isbn": "978-85-5519-076-6",
      "numeroPaginas": 144,
      "publicacao": "2015-06-01",
      "imagemCapa": "https://raw.githubusercontent.com/viniciosneves/alurabooks/curso-novo/public/imagens/livros/css.png",
      "autor": 6,
      "opcoesCompra": [
        {
          "id": 1,
          "titulo": "E-book",
          "preco": 29.9,
          "formatos": [
            ".pdf",
            ".pub",
            ".mob"
          ]
        },
        {
          "id": 2,
          "titulo": "Impresso",
          "preco": 39.9
        },
        {
          "id": 3,
          "titulo": "E-book + Impresso",
          "preco": 59.9,
          "formatos": [
            ".pdf",
            ".pub",
            ".mob"
          ]
        }
      ],
      "sobre": "Quando aprendemos a trabalhar com CSS, frequentemente nos pegamos perdidos em detalhes fundamentais que não nos são explicados. Por vezes, alguns desses detalhes passam despercebidos até pelo desenvolvedor front-end mais experiente. Mas como ir além do conhecimento básico do CSS e preparar o caminho para explorar tópicos mais avançados?"
    },
  ])
})

server.get('/public/mais-vendidos', (req, res) => {
  res.status(200).json([
    {
      "id": 1,
      "categoria": 3,
      "titulo": "Acessibilidade na Web",
      "slug": "acessibilidade-na-web",
      "descricao": "Boas práticas para construir sites e aplicações acessíveis",
      "isbn": "978-65-86110-10-4",
      "numeroPaginas": 246,
      "publicacao": "2020-04-01",
      "imagemCapa": "https://raw.githubusercontent.com/viniciosneves/alurabooks/curso-novo/public/imagens/livros/acessibilidade.png",
      "autor": 1,
      "opcoesCompra": [
        {
          "id": 1,
          "titulo": "E-book",
          "preco": 29.9,
          "formatos": [
            ".pdf",
            ".pub",
            ".mob"
          ]
        },
        {
          "id": 2,
          "titulo": "Impresso",
          "preco": 39.9
        },
        {
          "id": 3,
          "titulo": "E-book + Impresso",
          "preco": 59.9,
          "formatos": [
            ".pdf",
            ".pub",
            ".mob"
          ]
        }
      ],
      "sobre": "Acessibilidade na Web consiste na eliminação de barreiras de acesso em páginas e aplicações digitais para que pessoas com deficiência tenham autonomia na rede. Na verdade, acessibilidade na web beneficia todas as pessoas. Em algum momento da vida todos podem precisar de acessibilidade, seja devido a uma limitação temporária ou permanente. Quando não levamos em consideração o acesso de pessoas com deficiência, estamos tirando o direito de uma pessoa de navegar, interagir ou consumir produtos e serviços na rede. Empatia é o fator principal para que as aplicações que desenvolvemos sejam inclusivas."
    },
    {
      "id": 2,
      "categoria": 3,
      "titulo": "Angular 11 e Firebase",
      "slug": "angular11-e-firebase",
      "descricao": "Construindo uma aplicação integrada com a plataforma do Google",
      "isbn": "978-85-7254-036-0",
      "numeroPaginas": 163,
      "publicacao": "2019-11-01",
      "imagemCapa": "https://raw.githubusercontent.com/viniciosneves/alurabooks/curso-novo/public/imagens/livros/angular.png",
      "autor": 2,
      "opcoesCompra": [
        {
          "id": 1,
          "titulo": "E-book",
          "preco": 29.9,
          "formatos": [
            ".pdf",
            ".pub",
            ".mob"
          ]
        },
        {
          "id": 2,
          "titulo": "Impresso",
          "preco": 39.9
        },
        {
          "id": 3,
          "titulo": "E-book + Impresso",
          "preco": 59.9,
          "formatos": [
            ".pdf",
            ".pub",
            ".mob"
          ]
        }
      ],
      "sobre": "No desenvolvimento de aplicações web e mobile, há disponível uma quantidade expressiva de linguagens, frameworks e ferramentas. Nessa imensidão, é comum se questionar ou até ter inseguranças sobre qual o melhor caminho para a construção neste segmento. O Angular é uma plataforma que facilita a construção de aplicativos, combinando templates, injeção de dependências, tudo integrado às melhores práticas de desenvolvimento."
    },
    {
      "id": 3,
      "categoria": 1,
      "titulo": "Arquitetura de software distribuído",
      "slug": "arquitetura-de-software-distribuído",
      "descricao": "Boas práticas para um mundo de microsserviços",
      "isbn": "978-65-86110-86-9",
      "numeroPaginas": 138,
      "publicacao": "2021-10-01",
      "imagemCapa": "https://raw.githubusercontent.com/viniciosneves/alurabooks/curso-novo/public/imagens/livros/arquitetura.png",
      "autor": 3,
      "opcoesCompra": [
        {
          "id": 1,
          "titulo": "E-book",
          "preco": 29.9,
          "formatos": [
            ".pdf",
            ".pub",
            ".mob"
          ]
        },
        {
          "id": 2,
          "titulo": "Impresso",
          "preco": 39.9
        },
        {
          "id": 3,
          "titulo": "E-book + Impresso",
          "preco": 59.9,
          "formatos": [
            ".pdf",
            ".pub",
            ".mob"
          ]
        }
      ],
      "sobre": "Com constantes evoluções, adições de novas funcionalidades e integrações com outros sistemas, os softwares têm se tornado cada vez mais complexos, mais difíceis de serem entendidos. Dessa forma, fazer com que os custos de manutenção desses softwares não ultrapassem o valor que eles entregam às companhias é um desafio para a arquiteta ou arquiteto de software."
    }
  ])
})

server.use(/^(?!\/(public|livros|autores|categorias)).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Token inválido'
    res.status(status).json({ status, message })
    return
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401
      const message = 'Token de autenticação não encontrado'
      res.status(status).json({ status, message })
      return
    }
    next()
  } catch (err) {
    const status = 401
    const message = 'Token revogado'
    res.status(status).json({ status, message })
  }
})

server.use(router)

server.listen(8000, () => {
  console.log("API disponível em http://localhost:8000")
})
