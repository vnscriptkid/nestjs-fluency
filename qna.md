## QnA
- Differentiate btw 3-tier and hexagonal architecture
- CQRS vs Event Sourcing
  - CQRS is possible without Event Sourcing:
    - Example: ecommerce app product catalog
    - Core: separate read and write models
  - Event Sourcing likely to be used with CQRS
    - Core: store all changes as a sequence of events