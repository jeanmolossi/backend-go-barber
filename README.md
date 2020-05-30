# backend-go-barber

### Starter code tree

- src
  - config
  - database
  - errors
  - middlewares
  - models
  - repositories
  - routes
  - services

### Changed to DDD - Domain Driven Design & TDD - Test Driven Development

- src
  - config
  - modules
    - appointments
      - dtos
      - infra
        * http
          - controllers
          - routes
        * typeorm
          - entities
          - repositories
      - repositories
      - services
    - users
      - same than appointment
      - & providers
        - HashProvider
  - shared
    - same than appointment
    - & container
      - providers

# Business Rules

RF - Funcionalidades do sistema
RNF - Requisitos de parte técnica - libs

## Recuperação de senha

**RF (Requisitos funcionais)**

- [x] O usuário deve poder recuperar a senha informando seu e-mail;
- [ ] O usuário deve receber um e-mail com instruções de recuperação de senha;
- [ ] O usuário deve poder resetar sua senha;


**RNF (Requisitos não funcionais)**

- [ ] Utilizar ethereal para testar envios de e-mail em ambiente dev;
- [ ] Utilizar Amazon SES para envios de e-mail em produção;
- [ ] O envio de e-mails deve ser em segundo plano (background job);

**RN (Regras de negócio)**

- [ ] O link enviado por e-mail para resetar senha, deve expirar em 2h;
- [ ] O usuário deve confirmar senha ao resetar;

## Atualização de perfil

**RF**

- [ ] O usuário deve poder atualizar seu perfil (nome, e-mail e senha);

**RNF**

- [x] Nada a declarar

**RN**

- [ ] O usuário não pode alterar seu e-mail para um e-mail já em uso;
- [ ] Para atualizar senha, o usuário precisa informar a senha antiga;
- [ ] Para atualizar senha, o usuário precisa confirmar a nova senha;

## Painel do prestador

**RF**

- [ ] O usuário deve poder listar seus agendamentos de um dia específico;
- [ ] O prestador deve receber uma notificação sempre que houver novo agendamento;
- [ ] O prestador deve poder visualizar notificações não lidas;

**RNF**

- [ ] Os agendamentos do prestador no dia devem ser armazenados em cache;
- [ ] As notificações do prestador devem ser salvas em MongoDB;
- [ ] As notificações do prestador devem ser enviadas em real-time com Socket.io

**RN**

- [ ] A notificação deve ter um status de lida / não lida para que o prestador possa controlar

## Agendamento de serviços

**RF**

- [ ] O usuário deve poder listar todos os prestadores de serviços cadastrados;
- [ ] O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- [ ] O usuário deve poder listar os horários disponíveis em um dia específico de um prestador;
- [ ] O usuário deve poder realizar um novo agendamento com prestador;

**RNF**

- [ ] Listagem de prestadores deve ser armazenada em cache;

**RN**

- [ ] Cada agendamento dura 1 hora exatamente;
- [ ] Os agendamentos devem estar disponíveis entre às 08h e 18h (8-17);
- [ ] O usuário não pode agendar em horário já agendado;
- [ ] O usuário não pode agendar em horário que já passou;
- [ ] O usuário não pode agendar consigo mesmo;

## WorkGuide

1. Rotas e controllers
2. Repositorio de tokens (TypeORM)
3. Criar migration de tokens
4. Provider de envio de e-mail (DEV)
5. Registrar providers no container
6. Testar tudo!
