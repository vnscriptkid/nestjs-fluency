# CQRS

## ideas
- separate read and write models
  - write model
  - read model
- pros
  - scale independently
  - performance: different dbs optimized read/write
- cons
  - eventual consistency
  - more complex

## libs
- npm i @nestjs/cqrs
- npm i prisma

## cli
- nest g resource transactions