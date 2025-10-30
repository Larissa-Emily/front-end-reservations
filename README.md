# 📘 Documentação Técnica do Sistema de Reservas de Salas de Reunião
## 🧩 Visão Geral do Projeto
Este projeto é uma aplicação web completa, desenvolvida com React.js no front-end, NestJS no back-end e PostgreSQL como banco de dados relacional. Todo o ambiente é containerizado via Docker, garantindo isolamento, fácil manutenção e portabilidade entre ambientes de desenvolvimento e produção.
A aplicação foi idealizada para ser modular, escalável e segura, oferecendo uma base sólida para futuras expansões — seja com novas funcionalidades, módulos ou integrações externas.
________________________________________
## 🌐 Estrutura de Rotas
## 🖥️ Front-End (React + TailwindCSS)
O front-end utiliza React Router para controle de rotas e navegação, com proteção baseada em autenticação JWT e permissões de acesso por função (role).
A interface é desenvolvida com TailwindCSS, o que permite um design moderno, responsivo e de fácil manutenção.
Principais rotas:
•	/login: página de autenticação de usuários.
Possui sistema de limite de 3 tentativas de login; após ultrapassar, o usuário deve aguardar 10 minutos para tentar novamente.
•	/dashboard: painel principal com visão geral de salas disponíveis e próximas reuniões.
•	/reserve: permite visualizar, criar, editar e excluir reservas.
A visualização pode ser filtrada por usuário (ex.: “minhas reservas”).
•	/user: listagem e gerenciamento de usuários — restrita a usuários com role manager.
•	/room: gerenciamento das salas de reunião, com filtros por nome e características.
•	/profile: exibe os dados do usuário logado e o histórico de reservas, permitindo atualização de informações pessoais.
•	/logout: botão responsável por encerrar a sessão e redirecionar o usuário para o login.
Todas as rotas são protegidas, garantindo que apenas usuários autenticados e com as permissões adequadas tenham acesso.
________________________________________
## ⚙️ Back-End (NestJS)
A API segue o padrão modular do NestJS, com separação em módulos, controladores, serviços e entidades.
Isso garante uma arquitetura limpa, testável e de fácil manutenção.
Principais endpoints:
•	POST /auth: autenticação de usuários com geração de token JWT.
•	GET /user: retorna a lista de usuários cadastrados.
•	GET /user/:id: retorna os detalhes de um usuário específico.
•	POST /room: cadastra novas salas.
•	GET /reservation: lista todas as reservas.
•	DELETE /reservation/:id: remove uma reserva existente.
Além disso, há middlewares de autenticação e guards de autorização, implementados para proteger as rotas com base no token JWT e nas roles dos usuários.
________________________________________
## 🔐 Autenticação e Autorização com JWT
A autenticação é baseada em JSON Web Tokens (JWT), garantindo segurança, escalabilidade e compatibilidade com o front-end.
Após o login bem-sucedido:
1.	O servidor gera um token JWT contendo informações essenciais do usuário (sub, name, email, role, etc.).
2.	O token é enviado ao front-end e armazenado (normalmente no localStorage ou sessionStorage).
3.	Cada requisição subsequente inclui o token no cabeçalho de autorização (Authorization: Bearer <token>).
4.	Um AuthGuard no NestJS intercepta as requisições, valida o token e injeta as informações do usuário autenticado no contexto da requisição.
5.	As roles são verificadas através de decorators personalizados (@Roles('manager', 'user')), garantindo que apenas usuários com permissões adequadas acessem determinados endpoints.
Essa estrutura trouxe robustez e flexibilidade para o controle de acesso, permitindo:
•	Gerenciamento centralizado das permissões.
•	Facilidade em adicionar novos níveis de acesso no futuro.
•	Proteção completa das rotas privadas e administrativas.
________________________________________
## 🧪 Testes Automatizados com Jest
Durante o desenvolvimento, foi implementada uma camada de testes unitários e de integração utilizando o Jest, o framework nativo de testes do NestJS.
Os testes têm como objetivo:
•	Validar a integridade das regras de negócio (como criação e edição de reservas).
•	Garantir a segurança da autenticação, testando o fluxo completo do JWT.
•	Simular comportamentos reais, como usuários tentando acessar rotas sem token ou com roles incorretas.
Exemplos de testes implementados:
•	Testes unitários de serviços (UserService, RoomService, ReserveService) para garantir o correto funcionamento dos métodos de CRUD.
•	Testes de autenticação verificando:
o	Geração correta do token JWT.
o	Bloqueio de acesso quando o token é inválido ou expirado.
o	Permissões de acesso via @Roles().
•	Testes de integração entre módulos para validar a comunicação entre entidades (por exemplo, reservas vinculadas a usuários e salas).
O uso do Jest proporcionou confiança no código, detecção rápida de regressões e mais segurança ao realizar refatorações.
________________________________________
## 🧱 Banco de Dados e Integração com Docker
O banco de dados PostgreSQL é executado dentro de um container Docker, garantindo isolamento e facilidade de configuração.
Vantagens:
•	Subida e remoção de instâncias com um único comando (docker-compose up).
•	Isolamento total do ambiente local.
•	Facilitação no deploy e migração entre ambientes.
Principais tabelas:
•	users: informações de login, dados pessoais e roles.
•	rooms: cadastro e características das salas.
•	reservations: vínculo entre usuários, salas e horários.
O arquivo docker-compose.yml orquestra os containers do NestJS, PostgreSQL e (opcionalmente) pgAdmin, automatizando toda a inicialização do ambiente.
________________________________________
## ⚙️ Comando para instalar todas as dependências

# 1️⃣ Inicializa o projeto
npm init vite@latest bp-reserve-frontend -- --template react

cd bp-reserve-frontend

# 2️⃣ Instala as deps de produção e dev
npm install @tailwindcss/vite jwt-decode react react-dom react-icons react-router-dom react-toastify

npm install -D @eslint/js @types/react @types/react-dom @vitejs/plugin-react autoprefixer eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals postcss tailwindcss vite

## 👨‍💻 Usuário Mockado para Testes
Para testes e validação de funcionalidades administrativas, foi criado um usuário mockado com privilégios de “manager”.
Dados do usuário de teste:
•	Função: Manager
•	E-mail: henrique@gmail.com
•	Senha: Bem75!#P
•	Função principal: acessar rotas de gerenciamento, validar autenticação e fluxos administrativos.
Além disso, o sistema conta com validação de senha forte, exigindo letras maiúsculas, números e caracteres especiais no momento da criação.
________________________________________
## 🚀 Desafios e Experiências Durante o Desenvolvimento
Os principais desafios envolveram:
Encontrei muitos desafios no começo do projeto, pois estava diante de tecnologias e ferramentas totalmente novas. De início, não entendia como funcionava o Nest, mas me aprofundei na documentação e pude compreender ao longo do desenvolvimento do sistema. Entendi que no Nest é diferente do Node.js puro, pois no Nest existem os controllers, que cuidam das rotas da API, e os services, responsáveis pela lógica de negócio. Com isso, fui criando gosto pela tecnologia, pois ela permite ter um código bem organizado e estruturado.
Ganhei experiência em novas tecnologias e pude ver de perto o funcionamento do JWT, algo com que nunca tinha trabalhado, porém considero importante ter no sistema. Com tudo que aprendi com os erros e acertos desse projeto, buscarei no futuro aplicar os conhecimentos, a organização e, principalmente, a segurança nos próximos.
Esses pontos representaram um avanço significativo para mim como desenvolvedora iniciante.
________________________________________
## 🧠 Conclusão
Este projeto vai além de uma aplicação funcional — ele representa um estudo prático sobre arquitetura moderna, segurança e automação.
O uso de tecnologias como React, NestJS, JWT, Jest, PostgreSQL e Docker consolidou uma base sólida, escalável e segura, pronta para evoluir com novas funcionalidades e integrações.
Mais do que um sistema de reservas, este projeto simboliza o amadurecimento profissional em todo o ciclo de desenvolvimento web: da concepção ao deploy.
________________________________________
📅 Data da Documentação: 29 de outubro de 2025
👤 Autora: Larissa Emily
🧠 Stacks Principais: React.js • TailwindCSS • NestJS • PostgreSQL • Docker • Jest • JWT