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

**Example request / response:**

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

**curl example (not a bot):**

```bash
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -H "User-Agent: Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Accept-Language: en-US,en;q=0.9" \
  -H "Accept-Encoding: gzip, deflate, br" \
  -d '{"ip":"8.8.8.8","userAgent":"Mozilla/5.0 (Macintosh)","headers":{"accept-language":"en-US,en;q=0.9","accept-encoding":"gzip, deflate, br"}}'
```

**curl example (bot):**

```bash
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{
    "ip": "87.116.134.44",
    "userAgent": "Googlebot/2.1 (+http://www.google.com/bot.html)",
    "headers": {
      "accept-language": "en-US",
      "accept-encoding": "gzip"
    }
  }'
```

`GET /logs`

- Returns recent detection logs (for debugging/demo).
- Supports pagination via `limit` and `offset` query params.

```bash
curl "http://localhost:3000/logs?limit=20&offset=0"
```

## Environment

| Variable      | Required           |
| ------------- | ------------------ |
| `MONGODB_URI` | Yes                |
| `VPNAPI_KEY`  | No                 |
| `PORT`        | No (default: 3000) |
