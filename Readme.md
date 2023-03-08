Land Scape 1.0.0

Node version: 16.17.1

## Installation

```bash
docker build -t backend-landscape .
```
Environment variables:
```bash
PORT=3000
MONGO_URL=mongodb://localhost:27017/landscape
SECRET_JWT_SEED=l@nd_sc@ape_@th0rity_2022_@uth
```

## Usage

```bash
docker run -p 3000:3000 -d backend-landscape
```

