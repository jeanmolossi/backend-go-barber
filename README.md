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
- [x] O usuário deve receber um e-mail com instruções de recuperação de senha;
- [x] O usuário deve poder resetar sua senha;


**RNF (Requisitos não funcionais)**

- [x] Utilizar ethereal para testar envios de e-mail em ambiente dev;
- [ ] Utilizar Amazon SES para envios de e-mail em produção;
- [ ] O envio de e-mails deve ser em segundo plano (background job);

**RN (Regras de negócio)**

- [x] O link enviado por e-mail para resetar senha, deve expirar em 2h;
- [ ] O usuário deve confirmar senha ao resetar;

## Atualização de perfil

**RF**

- [x] O usuário deve poder atualizar seu perfil (nome, e-mail e senha);

**RNF**

- [x] Nada a declarar

**RN**

- [x] O usuário não pode alterar seu e-mail para um e-mail já em uso;
- [x] Para atualizar senha, o usuário precisa informar a senha antiga;
- [ ] Para atualizar senha, o usuário precisa confirmar a nova senha;

## Painel do prestador

**RF**

- [ ] O usuário deve poder listar todos prestadores de serviço cadastrados;
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

- [x] O usuário deve poder listar todos os prestadores de serviços cadastrados;
- [x] O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- [x] O usuário deve poder listar os horários disponíveis em um dia específico de um prestador;
- [x] O usuário deve poder realizar um novo agendamento com prestador;

**RNF**

- [ ] Listagem de prestadores deve ser armazenada em cache;

**RN**

- [x] Cada agendamento dura 1 hora exatamente;
- [x] Os agendamentos devem estar disponíveis entre às 08h e 18h (8-17);
- [x] O usuário não pode agendar em horário já agendado;
- [x] O usuário não pode agendar em horário que já passou;
- [x] O usuário não pode agendar consigo mesmo;

## WorkGuide
