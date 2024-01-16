## nestjs

#### cli
- npm install -g @nestjs/cli
- nest new sample

#### architecture
- layered (n-tier)
- three tier
- hexagonal (ports and adapters)
  - domain centric
  - concepts
    - ports   
    - adapters
  - benefits: decoupling, testability 
- onion
- ddd
- cqrs
- event sourcing

#### layered (n-tier)
- presentation layer
- application layer
- domain layer
- data access layer

#### three layered (default nestjs architecture)
- controller
- service
- data access (prisma, typeorm) 