# Aula 09 - Mock e Testes Unitarios

Projeto em Node.js, Express e TypeScript criado para a atividade de testes unitarios com mocks.

O objetivo principal e testar os endpoints de usuarios sem depender diretamente do arquivo `users.json`. Para isso, os testes mockam os metodos do `UserRepository` e validam o comportamento do `UserController`.

## Tecnologias

- Node.js
- Express
- TypeScript
- Jest
- ts-jest
- Supertest

## Endpoints testados

Os testes estao em `__tests__/endpoints/users/UserController.test.ts`.

Eles cobrem os seguintes endpoints:

- `GET /users`: listagem de usuarios
- `GET /users/:id`: visualizacao de um usuario
- `POST /users`: criacao de usuario
- `DELETE /users/:id`: exclusao de usuario

Tambem foram adicionados testes para cenarios de erro, como usuario nao encontrado, falha ao criar usuario e falha ao excluir usuario.

## Como os mocks funcionam

Nos testes, os metodos do `UserRepository` sao substituidos por retornos controlados usando `jest.spyOn`.

Exemplo:

```ts
jest.spyOn(UserRepository.prototype, 'list').mockReturnValueOnce(mockUsers);
```

Com isso, o teste nao precisa ler nem alterar o arquivo `users.json`. Ele verifica somente se o controller responde corretamente para cada retorno simulado do repositorio.

## Como instalar

```bash
npm install
```

## Como rodar os testes

```bash
npm test
```

Resultado esperado:

```text
Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
```

## Como gerar cobertura de testes

```bash
npm run test:coverage
```

## Como compilar o projeto

```bash
npm run build
```

## Como executar com Docker

```bash
docker compose up -d --build
```

A aplicacao ficara disponivel em:

```text
http://localhost:3333
```

## Scripts disponiveis

- `npm run dev`: inicia o projeto em modo desenvolvimento com Nodemon
- `npm run build`: compila o TypeScript para JavaScript
- `npm test`: executa os testes com Jest
- `npm run test:coverage`: executa os testes e gera relatorio de cobertura

## Observacao

Este projeto foi ajustado para que o Jest ignore a pasta `build`, evitando que testes compilados sejam executados em duplicidade.
