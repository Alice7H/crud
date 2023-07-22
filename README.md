# CRUD

O Prisma Client pode ser usado dentro de seus controladores de rota sendo responsável por enviar consultas ao seu banco de dados.

![Prisma Stack](https://www.prisma.io/docs/static/0fe9740adc2f886a2a59761e06d98d99/42cbc/prisma-rest-apis.png)

Ele pode ser combinado com qualquer biblioteca de servidor HTTP ou framework web.

## Tecnologias

- Jsonwebtoken
- Bcrypt
- Prisma
- SQLite
- React-hook-form
- Zod
- Tailwindcss

## Rotas de API

- api
  - users
    - route.ts => { GET }
    - [id]
      - route.ts => { GET, PUT, DELETE }
    - authenticate
      - route.ts => { POST }
    - register
      -route.ts => { POST }
