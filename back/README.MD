# RecruiterPRO API

Esta é uma API utilizada na plataforma de recrutamento e seleção recruiterPRO onde a mesma gerencia as requisiçoes e as respostas e faz toda regra de negócio para alterações no banco de dados MongoDB.

## Endpoints (Recrutador)

### POST /recruiter/create

Este endpoint serve para registrar um novo recrutador no banco de dados

#### Parâmetros

São passados como parâmetros no corpo da requisição nome, email, senha e nome da compania que o recrutador trabalha porém em inglês.

Exemplo com axios em ambiente local:

```
let url = 'http://localhost:3000/recruiter/create'

let recruiter = {name: 'nome',
                email: 'seuemail@mail.com',
                password: 'senha',
                company: 'Empresa que trabalha' }

axios.post(url, recruiter)
```

#### Possiveis Respostas

##### OK | Status Code 200

Caso a requisição seja bem sucedida

```
{
    status: true,
    msg: 'Usuário cadastrado com sucesso!'
}

```

##### Internal Server Error | Status code 500

Caso aconteça algum problema entre a API e o Servidor

```
{
    status: false,
    msg: 'Houve um problema com o servidor.'
}
```

##### Unauthorized | Status Code 401

Caso já existe um cadastro com o mesmo email passado na requisição

```
{
    status: false,
    msg: 'Já existe um cadastro com esse email no sistema.'
}
```

##### Unauthorized | Status Code 401

Caso os campos obrigatórios (name, email, password) sejam undefined ou uma string vazia.

```
{
    status: false,
    msg: 'Preencha todos os dados necessários.'
}
```

<br>
<hr>
<br>

### POST /recruiter/login

Este endpoint serve para fazer a authenticação do usuário, ele trabalha em conjunto com o endpoint "/recruiter/validate" que é usado com o recurso router-guard para guardar as rotas do front-end.

#### Parâmetros

São passados como parâmetro email e senha (em inglês) para realizar a authenticação.

Exemplo com axios em ambiente local:

```
let url = 'http://localhost:3000/recruiter/login'

let data = { email: 'seuemail@mail.com',
            password: 'senha' }

axios.post(url, data)
```

#### Possiveis Respostas

##### OK | Status Code 200

Caso a requisição seja bem sucedida.

```
{
    status: true,
    token: 'token gerado após autenticação',
    id: 'id do recrutador'
}
```

<p style="color: blueviolet; font-size: 1.2rem;">Obs: Estas informações devem ser salvas no LocalStorage do navegador.</p>

##### Unauthorized | Status Code 401

Caso a senha passada não corresponda a senha cadastrada no banco de dados.

```
{
    status: false,
    msg: 'Senha inválida'
}
```

##### Not Found | Status code 404

Caso o email de usuário passado não corresponda a nenhum email cadastrado no banco de dados.

```
{
    status: false,
    msg: 'Usuário não encontrado em nossa base de dados'
}
```
<br>
<hr>
<br>

### POST /recruiter/validate
A rota validate serve para fazer o router-guard, nela existe um middleware que verifica as informações da authenticação passadas no token quando fazemos login e salvamos no LocalStorage.

#### Parâmetros
Nenhum

Exemplo com axios em ambiente local:

```
let req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }

axios.post('http://localhost:3000/recruiter/validate',{},req)

```

#### Possiveis respostas
##### OK | Status Code 200
Caso a requisição passe pelo middleware.
```
{
    status: true, 
    msg: 'Validação OK'
}

```
##### Forbiden | Status Code 403
Caso a requisição não passe pelo middleware.
```
{
    'Você não está autenticado.'
}
```

<br>
<hr>
<br>

### POST /vacancy/new

Este endpoint serve para cadastrar uma nova vaga no banco de dados.

#### Parâmetros

São passados como parâmetro no corpo da requisição o ID do recrutador que é obtido após autenticação e salvo no LocalStorage (Então basta pegar esta informação no LocalStorage), o Titulo da vaga e a Tescrição da vaga (Em inglês).

Exemplo com axios em ambiente local:

```
let url = 'http://localhost:3000/vacancy/new'

let vacancy = { title: 'Titulo da Vaga',
                description: 'Descrição da Vaga',
                recruiterId: 'Id do recrutador' }

axios.post(url, vacancy)
```

#### Possiveis Respostas

##### OK | Status Code 200

Neste casoa vaga foi cadastrada e salva no banco de dados com sucesso.

```
{
    status: true,
    msg: 'Vaga cadastrada com sucesso!'
}
```

##### Internal Server Error | Status Code 500

Neste caso algum problema entre a API e o bando de dados ocorreu.

```
{
    status: false,
    msg: 'Houve um problema com o servidor.'
}
```

##### Unauthorized | Status Code 401

Neste caso um ou mais parâmetros foram passados como undefined ou uma string vazia na requisição.

```
{
    status: false,
    msg: 'Preencha todos os dados necessários.'
}
```

<br>
<hr>
<br>

### GET /vacancy/:vacancyId

Este endpoint retorna as informações de uma vaga especifica.

#### Parâmetros

É passado como parâmetro para este endpoint o ID da vaga via parametros na rota.

Exemplo com axios em ambiente local:

```
let vacancyId = 'id da vaga'

let url = 'http://localhost:3000/vacancy/' + vacancyId

axios.get(url)
```

#### Possiveis Respostas

##### OK | Status Code 200

Caso a requisição seja bem sucedida.

```
{
    tatus: true,
    vacancy: {
        "_id": { "$oid": "id da vaga" },
        "title": "Titulo da vaga",
        "description": "Descrição da vaga",
        "recruiterId": "ID do recrutador que criou a vaga",
        "candidates": [IDs dos candidatos que se inscreveram na vaga],
        "__v": 0
    }
}
```

##### Internal Server Error | Status Code 500

Caso aconteça algum problema entre API e banco de dados durante o processo de deleção.

```
{
    status: false,
    msg: 'Problema ao conectar com servidor.'
}
```

<br>
<hr>
<br>

### DELETE /vacancy/:id

Este endpoint serve para finalizar uma vaga (deleta-la).

#### Parâmetros

É passado como parâmetro para esta rota o ID da vaga via parametros na rota.

Exemplo com axios em ambiente local:

```
let vacancyId = 'id da vaga'

let url = 'http://localhost:3000/vacancy/' + vacancyId

axios.delete(url)
```

#### Possiveis Respostas

##### OK | Status Code 200

Caso a vaga seja finalizada com sucesso.

```
{
    status: true,
    msg: 'Vaga finalizada com sucesso.'
}
```

##### Internal Server Error | Status Code 500

Caso aconteça algum problema entre API e banco de dados durante o processo de deleção.

```
{
    status: false,
    msg: 'Houve uma falha ao deletar.'
}
```

<br>
<hr>
<br>


### PATCH /vacancy/:id

Este endpoint serve para realizar alterações em uma vaga especifica.

#### Parâmetros

É passado como parâmetro para esta rota o novo titul, a nova descrição e ID da vaga via parametros na rota.

Exemplo com axios em ambiente local:

```
let vacancyId = 'id da vaga'

let url = 'http://localhost:3000/vacancy/' + vacancyId
let changeInfos = { title: 'Titulo da Vaga',
                    description: 'Descrição da Vaga',
                    recruiterId: 'Id do recrutador' }

axios.patch(url, changeInfos)
```

#### Possiveis Respostas

##### OK | Statucs Code 200
Caso as alterações sejam realizadas com sucesso no banco de dados.
```
{
    status: true, 
    msg: 'Informações da vaga atualizadas com sucesso.'
}
```
##### Internal Server Error | Status Code 500
Caso aconteça algum problema entrea API e o banco de dados.
```
{
    status:false, 
    msg: 'Houve um erro ao atualizar.'
}
```

##### Unauthorized | Status Code 401
Caso os parâmetros obrigatórios sejam passados como undefined ou como uma string vazia.
```
{
    status:false, 
    msg: 'Necessário inserir todas as informações.'
}
```

<br>
<hr>
<br>

### POST /vacancies/show
Este endpoint serve para exibir todas as vagas cadastradas por um recrutador.

#### Parâmetros
Esta rota recebe como parâmetro no corpo da requisição o Id do recrutador (recruiterId).

Exemplo com axios em ambiente local:

```
let recruiterId = 'id da recrutador que está no LocalStorage'

let url = 'http://localhost:3000/vacancy/show'

axios.post(url, {recruiterId: recruiterId})
```
#### Possiveis Respostas
##### OK | Status Code 200
Caso a requisição seja feita corretamente.
```
{
    status: true, 
    vacancies: [
        {
            "_id": { "$oid": "id da vaga" },
            "title": "Titulo da vaga",
            "description": "Descrição da vaga",
            "recruiterId": "ID do recrutador que criou a vaga",
            "candidates": [IDs dos candidatos que se inscreveram na vaga],
            "__v": 0
        },
        {
            "_id": { "$oid": "id da vaga" },
            "title": "Titulo da vaga",
            "description": "Descrição da vaga",
            "recruiterId": "ID do recrutador que criou a vaga",
            "candidates": [IDs dos candidatos que se inscreveram na vaga],
            "__v": 0
        },
        {
            "_id": { "$oid": "id da vaga" },
            "title": "Titulo da vaga",
            "description": "Descrição da vaga",
            "recruiterId": "ID do recrutador que criou a vaga",
            "candidates": [IDs dos candidatos que se inscreveram na vaga],
            "__v": 0
        }
    ]
}
```
Ou caso o recrutador não tenha vagas cadastradas.
```
{
    status: true, 
    vacancies: [] 
}
```

##### Internal Server Error | Status Code 500
Caso aconteça um problema entre a API e o banco de dados.
```
{
    status: false, 
    msg: 'Houve um problema ao consultar as vagas.'
}
```

<br>
<hr>
<br>

### POST /vacancy/sendFeedback
Este endpoint serve para enviar feedback para um candidato a uma vaga cadastrada pelo recrutador e automaticamento o mesmo é finalizado da vaga.

#### Parâmetros 
Este endpointe recebe como parâmetro o Titulo do Feedback, a mensagem do feedback, Id do candidato, Id da vaga e Titulo da vaga (em inglês).

Exemplo com axios em ambiente local:

```
let feedbackData = {
    vacancyTitle: 'Titulo da vaga', 
    feedbackTitle: 'Titulo do Feedback', 
    feedbackMensage: 'Mensagem do Feedback', 
    candidate: 'Id do candidato', 
    vacancyId: 'Id da vaga'
}

let url = 'http://localhost:3000/vacancy/sendFeedback'

axios.post(url, feedbackData)
```
#### Possiveis Respostas
##### OK | Status Code 200
Caso o feedback seja cadastrado com sucesso.
```
{
    status: true, 
    msg: 'Feedback enviado com sucesso.'
}
```
##### Internal Server Error | Status Code 500
Pode acontecer por dois motivos, ou aconteceu um erro ao enviar um feedback ou um erro ao finalizar o candidato na vaga.

```
{
    status: false, 
    msg: 'Houve um problema finalizar o candidato.'
}

---------------------------- ou ---------------------------

{
     status: false, 
     msg: 'Houve um problema ao enviar o feedback.'
}
```

##### Unauthorized | Status Code 401
Caso os parâmetros sejam passados como Undefined ou como uma string vazia.
```
{
    status: false, 
    msg: 'Não permitido! Confira os dados e tente novamente.'
}
```

<br>
<hr>
<br>


## Endpoints (Candidato)

### POST /candidate/create

Este endpoint serve para registrar um novo recrutador no banco de dados

#### Parâmetros

São passados como parâmetros no corpo da requisição nome, email, senha, link do currículo, linkedin e uma descrição do candidato (em inglês).

Exemplo com axios em ambiente local:

```
let url = 'http://localhost:3000/candidate/create'

let candidate = {name: 'nome',
                email: 'seuemail@mail.com',
                password: 'senha',
                linkCV: 'Link do Curriculo',
                linkedIn: 'LinkedIn do Candidato',
                description: 'descrição do candidato' 
                }

axios.post(url, candidate)
```

#### Possiveis Respostas

##### OK | Status Code 200

Caso a requisição seja bem sucedida

```
{
    status: true,
    msg: 'Usuário cadastrado com sucesso!'
}

```

##### Internal Server Error | Status code 500

Caso aconteça algum problema entre a API e o Servidor

```
{
    status: false,
    msg: 'Houve um problema com o servidor.'
}
```

##### Unauthorized | Status Code 401

Caso já existe um cadastro com o mesmo email passado na requisição

```
{
    status: false,
    msg: 'Já existe um usuário com esse email no sistema.'
}
```

##### Unauthorized | Status Code 401

Caso os campos obrigatórios (name, email, password) sejam undefined ou uma string vazia.

```
{
    status: false,
    msg: 'Preencha todos os dados necessários.'
}
```

<br>
<hr>
<br>

### POST /candidate/login

Este endpoint serve para fazer a authenticação do usuário, ele trabalha em conjunto com o endpoint "/candidate/validate" que é usado com o recurso router-guard para guardar as rotas do front-end.

#### Parâmetros

São passados como parâmetro email e senha (em inglês) para realizar a authenticação.

Exemplo com axios em ambiente local:

```
let url = 'http://localhost:3000/candidate/login'

let data = { email: 'seuemail@mail.com',
            password: 'senha' }

axios.post(url, data)
```

#### Possiveis Respostas

##### OK | Status Code 200

Caso a requisição seja bem sucedida.

```
{
    status: true,
    token: 'token gerado após autenticação',
    id: 'id do candidato'
}
```

<p style="color: blueviolet; font-size: 1.2rem;">Obs: Estas informações devem ser salvas no LocalStorage do navegador.</p>

##### Unauthorized | Status Code 401

Caso a senha passada não corresponda a senha cadastrada no banco de dados.

```
{
    status: false,
    msg: 'Senha inválida'
}
```

##### Not Found | Status code 404

Caso o email de usuário passado não corresponda a nenhum email cadastrado no banco de dados.

```
{
    status: false,
    msg: 'Usuário não encontrado em nossa base de dados'
}
```
<br>
<hr>
<br>

### POST /candidate/validate
A rota validate serve para fazer o router-guard, nela existe um middleware que verifica as informações da authenticação passadas no token quando fazemos login e salvamos no LocalStorage.

#### Parâmetros
Nenhum

Exemplo com axios em ambiente local:

```
let req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }

axios.post('http://localhost:3000/candidate/validate',{},req)

```

#### Possiveis respostas
##### OK | Status Code 200
Caso a requisição passe pelo middleware.
```
{
    status: true, 
    msg: 'Validação OK'
}

```
##### Forbiden | Status Code 403
Caso a requisição não passe pelo middleware.
```
{
    'Você não está autenticado.'
}
```

<br>
<hr>
<br>

### GET /candidate/:candidateId
Rota que retorna todas as informações do candidato.
#### Parâmetro 
É passado como parâmetro para este endpoint o id do candidato na url da requisição que obtivemos ao fazer o login e salvamos no LocalStorage.

Exemplo com axios em ambiente local: 
```
let id = localStorage.getItem('id')
let url = 'http://localhost:3000/candidate/' + id

axios.get(url)

```

#### Possiveis Respostas
##### OK | Status Code 200
Caso as informações do dandidato sejam encontradas no banco de dados corretamente.

```
{
    status: true, 
    candidate: {
                "_id": { "$oid": "642ef3d3575395d54ef4e2ab" },
                "name": "Nome do candidato",
                "email": "email do candidato",
                "password": "Senha com hash do candidato",
                "description": "Descrição do candidato",
                "linkCV": "Link do currículo do dandidato",
                "linkedIn": "link do linkedIn do candidato",
                "mode": false,
                "__v": 0
            }
}
```

##### Not Found | Status Code 404
Caso nenhuma corrêspondência com o ID do candidato seja encontrado no banco de dados.

```
{
    status: false, 
    msg: 'Nenhum Perfil Encontrado.'
}
```

##### Internal Server Error | Status Code 500
Caso aconteça algum problema entre a API e o banco de dados.
```
{
    status: false, 
    msg: 'Problemas ao conectar com o servidor.'
}
```

<br>
<hr>
<br>

### GET /vacancies
Esta é a rota que lista todas as vagas em aberto (de todos os recrutadores).

#### Parâmetros
Nenhum

Exemplo com axios em ambiente local: 

```
let url = 'http://localhost:3000/vacancies'
let response = await axios.get(url)
```
#### Possiveis Respostas
##### OK | Status Code 200
Caso a requisição seja bem sucedida.
```
{
    status: true, 
    vacancies: [
        {
            "_id": { "$oid": "id da vaga" },
            "title": "Titulo da vaga",
            "description": "Descrição da vaga",
            "recruiterId": "ID do recrutador que criou a vaga",
            "candidates": [IDs dos candidatos que se inscreveram na vaga],
            "__v": 0
        },
        {
            "_id": { "$oid": "id de outra vaga" },
            "title": "Titulo de outra vaga",
            "description": "Descrição de outra vaga",
            "recruiterId": "ID do recrutador que criou a vaga",
            "candidates": [IDs dos candidatos que se inscreveram na vaga],
            "__v": 0
        },
        {
            "_id": { "$oid": "id de outra vaga" },
            "title": "Titulo de outra vaga",
            "description": "Descrição de outra vaga",
            "recruiterId": "ID do recrutador que criou a vaga",
            "candidates": [IDs dos candidatos que se inscreveram na vaga],
            "__v": 0
        }
    ]
}
```

##### Not Found | Status Code 404
Caso nenhum registro de vaga seja encontrado.
```
{
    status: false, 
    msg: 'Não existem vagas abertas.'
}
```

##### Internal Server Error
Caso aconteça um problema entre a API e o banco de dados.
```
{
    ststua: false, 
    msg: 'Houve um problema com o servidor' 
}
```

<br>
<hr>
<br>


### GET /vacancyInfo/:vacancyId
Este endpoint retorna as informações de uma vaga especifica.

#### Parâmetros

É passado como parâmetro para este endpoint o ID da vaga via parametros na rota.

Exemplo com axios em ambiente local:

```
let vacancyId = 'id da vaga'

let url = 'http://localhost:3000/vacancyInfo/' + vacancyId

axios.get(url)
```

#### Possiveis Respostas

##### OK | Status Code 200

Caso a requisição seja bem sucedida.

```
{
    tatus: true,
    vacancy: {
        "_id": { "$oid": "id da vaga" },
        "title": "Titulo da vaga",
        "description": "Descrição da vaga",
        "recruiterId": "ID do recrutador que criou a vaga",
        "candidates": [IDs dos candidatos que se inscreveram na vaga],
        "__v": 0
    }
}
```

##### Internal Server Error | Status Code 500

Caso aconteça algum problema entre API e banco de dados durante o processo de deleção.

```
{
    status: false,
    msg: 'Problema ao conectar com servidor.'
}
```

<br>
<hr>
<br>

### POST /vacancy/apply
Esta é a rota que faz com que o candidato se aplique a uma vaga especifica 

#### Parâmetros
São passados como parâmetros no corpo da requisição o Id da vaga e o Id do candidato (em inglês).

Exemplo com axios em ambiente local: 
```
let url = 'http://localhost:3000/vacancy/apply'

let data = { vacancyId: 'Id da Vaga', 
             candidateId: 'Id do candidato que está salvo no LocalStorage' }

axios.post(url, data)

```
#### Possiveis Respostas
##### OK | Status Code 200
Caso a aplicação ocorra com sucesso.
```
{
    status: true, 
    msg: 'Candidatura Realizada com sucesso.'
}
```

##### Unauthorized | Status Code 401
Caso o candidato já seja candidato a vaga passada na requisição ou caso os parâmetros sejam passados como undefined ou uma string vazia.
```
{
    status: false, 
    msg: 'Não autorizado, você já está concorrendo a esta vaga.'
}

--------------------------------- ou --------------------------------

{
    status: false, 
    msg: 'Não autorizado, preencha todos os dados para se candidatar.'
}
```
##### Internal Server Error | Status Code 500
Caso aconteça algum problema entre a API e o banco de dados.
```
{
    status: false, 
    msg: 'Falha ao se candidatar'
}
```

<br>
<hr>
<br>


### POST /vacancy/applications
Esta rota retorna todas as vagas que o candidato está candidatado e que ainda não recebeu um feedback do processo.

#### Parâmetros
É passado como parâmetro o id do candidato (candidateId) que foi salvo no LocalStorage do navegador quando o login é feito.

Exemplo com o axios em ambiente local:
```
let url = 'http://localhost:3000/vacancy/applications'

let id = localStorage.getItem('id')

axios.post(url, { candidateId: id })
```

#### Possiveis Respostas
##### Ok | Status Code 200
Caso a requisição seja bem sucedida e o candidato esteja concorrendo ao menos a uma vaga.
```
{
    status: true, 
    applications: [
        {
            "_id": { "$oid": "id da vaga" },
            "title": "Titulo da vaga",
            "description": "Descrição da vaga",
            "recruiterId": "ID do recrutador que criou a vaga",
            "candidates": [IDs dos candidatos que se inscreveram na vaga],
            "__v": 0
        },
        {
            "_id": { "$oid": "id de outra vaga" },
            "title": "Titulo de outra vaga",
            "description": "Descrição de outra vaga",
            "recruiterId": "ID do recrutador que criou a vaga",
            "candidates": [IDs dos candidatos que se inscreveram na vaga],
            "__v": 0
        }
    ]
}
```

##### Not Found | Status Code 404
Caso a requisição seja bem sucedida porém o candidato não esteja concorrendo ao menos a uma vaga.

```
{
    status: false, 
    msg: 'Você ainda não aplicou para nenhuma vaga.'
}
```

##### Internal Server Error | Status Code 500
Caso aconteça algum problema entre a API e o banco de dados.
```
{
    status: false, 
    msg: 'Houve um problema com o servidor.'
}
```

<br>
<hr>
<br>

### POST /vacancy/feedbacks'
Esta rota serve para retornar os feedbacks de todas as vagas que o candidato applicou e que já obteve um retorno do processo seletivo.

#### Parâmetros
É passado como parâmetro desta rota o id do candidato que foi salvo no LocalStorage no momento em que o login foi feito.

Exemplo com axios em ambiente local:
```
let url = 'http://localhost:3000/vacancy/feedbacks'

let id = localStorage.getItem('id')

axios.post(url, {candidateId: id})

```

#### Possiveis Respostas
##### OK | Status Code 200
Caso a requisição seja bem sucedida e o candidato tenha feedback de ao menos uma vaga a qual se candidatou.
```
{
    status: true, 
    feedbacks: [
        { 
            "_id": { "$oid": "id do feedback" },
            "vacancyTitle": "Titulo da Vaga que o feedback se refere",
            "feedback": [{
                            "title": "titulo do feedback",
                            "mensage": "mensagem do feedback",
                            "_id": { "$oid": "id da mesnagem" }
                        }],
            "candidate": "id do candidato",
            "__v": 0
        },
        { 
            "_id": { "$oid": "id do feedback" },
            "vacancyTitle": "Titulo da Vaga que o feedback se refere",
            "feedback": [{
                            "title": "titulo do feedback",
                            "mensage": "mensagem do feedback",
                            "_id": { "$oid": "id da mesnagem" }
                        }],
            "candidate": "id do candidato",
            "__v": 0
        }
    ]
}
```

##### Internal Server Error | Status Code 500
Caso ocorra algum problema entre a API e o banco de dados.
```
{
    status: false, 
    msg: 'Houve um erro ao consultar seus feedbacks.'
}
```

<br>
<hr>
<br>

## API created by Tiago Junker
### linkedin: https://www.linkedin.com/in/junkertiago/
### github: https://github.com/tiagojunker
### contato: tiago99junker@gmail.com

```



```









