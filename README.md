# PubgmApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.3.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Comands to run

change host to the pc ips (same for the npm run start)
cd db
json-server --watch dayplayerstats.json --port 3001 --host 192.168.100.236
cd db
json-server --watch daystanding.json --port 3000 --host 192.168.100.236
cd db
json-server --watch db.json --port 3002 --host 192.168.100.236

## Or use concurrently

concurrently "json-server --watch db/dayplayerstats.json --port 3001 --host 192.168.100.236" "json-server --watch db/daystanding.json --port 3000 --host 192.168.100.236" "json-server --watch db/db.json --port 3002 --host 192.168.100.236"
