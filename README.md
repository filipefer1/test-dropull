# Dropull Challenge

Repositório para o desafio da Dropull.

### Tecnologias

- NestJs
- Postgres
- TypeScript
- Docker
- Typeorm
- Multer

### Desafios/Problemas

O desafio consistia na criação de uma api que pudesse cadastrar e exibir assets e cadastrar um nft vinculado com um asset, além de listar todos os nfts.

### Setup

- Faça um clone do repositório

```bash
git clone https://github.com/filipefer1/test-dropull.git
```

- Instale as dependências

```bash
yarn
```

- Inicialize a aplicação

```bash
docker-compose up
```

- Execute os testes

```bash
yarn test:watch
```

#### Endpoints

##### - User

```
POST - http://localhost:3333/user
```

```json
{
  "nickname": "nickname",
  "email": "email@email.com",
  "password": "some-password"
}
```

##### - Auth

```
POST - http://localhost:3333/auth/login
```

```json
{
  "username": "nickname",
  "password": "some-password"
}
```

##### - Asset

```
GET - http://localhost:3333/asset
```

```
POST - http://localhost:3333/asset
```

Esse endpoint utiliza multpart/form, então você pode fazer um upload de uma imagem.

```
asset: File;
name: string;
description: string;
```

##### - Nft

```
GET - http://localhost:3333/nft
```

```
POST - http://localhost:3333/nft
```

```json
"assetId": "asset-id",
"quantity": 2
```
