# hackathon-2023-ng-spring
java 17 version is required


## Endpoint

## Form structure

- GET /forms-structure
- POST /forms-structure
```json
{
  "name": "aaa",
  "structure" : "...."
}
```
- PUT /forms-structure/{id}
```json
{
  "name": "aaa",
  "structure" : "...."
}
```
- DELETE /forms-structure/{id}

## Form answers

- GET /forms-answers
- POST /forms-answers
```json
{
  "idForm": "123",
  "structure" : "...."
}
```
- DELETE /forms-answers/{id}


