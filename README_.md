<p align="center"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></p>
</p>

<p align="center"><img src="https://laravel.fi/laravel-login.png" width="400" alt="Laravel Logo"></p>
</p>

## Todo

- ![#FFD700](https://placehold.co/10x10/FFD700/FFD700.png) `ny bruker`
- ![#FFD700](https://placehold.co/10x10/FFD700/FFD700.png) `glemt passord`
- ![#FFD700](https://placehold.co/10x10/FFD700/FFD700.png) `profilside`
- ![#FFD700](https://placehold.co/10x10/FFD700/FFD700.png) `Handle request timeoui sanctum 401 {
    "message": "Unauthenticated."
}`

## About repo

<p>Code skill and technical preview for Kenneth Hauklien</p>
<p>Put together for CoreTrek to evaluate candidate</p>

Herd gives this site URL: https://laravel-ct-preview.test/
This project was buildt using Laravel Herd and uses Vite bulder with React front-end rendering. For simpicity db storage is set to sqlite3. The frontend uses Typescript for better code quality.

#### Herd generated Hosts

```
Excerpt from windws hosts file [C:\Windows\System32\drivers\etc\hosts]

127.0.0.1 database.herd.test
127.0.0.1 laravel-ct-preview.test
```

## Repo showcases the following topics

- Basic API functionallity
- Testing of code and functions
- DB / Relation / ORM / Seeder
- SPA application | React 18, Typescript 5
- Linting, Pinting (PES PHP standard)

## Requirements

- Node v20.12.2 or later
- Yarn v1.22.4
- Herd / XAMP / Docker (Sails) or other setup with PHP 8.3
- Composer v2.7.7

## Build steps

```
## Download and build modules and vendors
composer install
yarn
 
## Migrate database
php artisan migrate
 
## Seed datbase
php artisan db:seed
 
## Start dev server [must be running for tests to succeed]
yarn dev
 
## Run PHP tests
php artisan test
 
## Lint PHP code with pint
php vendor/bin/pint --test -v
 
## Lint JS code with eslint
yarn lint
 
## Navigate to: https://laravel-ct-preview.test
Username: test@test.com
Password: 12345678
```
