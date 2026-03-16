# Cloak Service

A microservice that detects bots and suspicious traffic via RESTful API.

## Stack

- NestJS · MongoDB · Docker · Swagger · vpnapi.io

## Quick Start

```bash
cp .env.example .env
docker compose up --build
```

API: `http://localhost:3000`  
Swagger: `http://localhost:3000/api-docs`

## How It Works

Each request runs through a chain of independent filters in parallel.
Adding a new filter = create one file, register in `FiltersModule`.

| Filter               | Triggers                                             |
| -------------------- | ---------------------------------------------------- |
| `UserAgentFilter`    | `empty_user_agent`, `headless_browser`, `known_bot`  |
| `HeadersFilter`      | `missing_accept_language`, `missing_accept_encoding` |
| `IpReputationFilter` | `vpn_or_proxy`, `datacenter_ip`                      |

## API

`POST /check`

```json
// Request
{
 "ip": "185.220.101.5",
 "userAgent": "Mozilla/5.0...",
 "headers": { "accept-language": "en-US", "accept-encoding": "gzip" }
}

// Response
{
 "isBot": true,
 "reasons": ["datacenter_ip"]
}
```

## Environment

| Variable      | Required           |
| ------------- | ------------------ |
| `MONGODB_URI` | Yes                |
| `VPNAPI_KEY`  | No                 |
| `PORT`        | No (default: 3000) |
