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
  - shared

