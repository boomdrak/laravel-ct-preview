<p align="center"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></p>
</p>

## About repo

<p>Code skill and technical preview for Kenneth Hauklien</p>
<p>Put together for CoreTrek to evaluate candidate</p>

Herd gives this site URL: https://laravel-ct-preview.test/
This project was buildt using Laravel Herd, Laravel Sails, uses Vite bulder with React front-end rendering. For simpicity db storage is set to sqlite3

#### Herd generated Hosts

```
Excerpt from windws hosts file [C:\Windows\System32\drivers\etc\hosts]

127.0.0.1 database.herd.test
127.0.0.1 laravel-ct-preview.test
```

##### End Herd generated Hosts

## Repo showcases the following topics

- Basic API functionallity
- Testing of code and functions
- DB / Relation / ORM
- CRUD operations
- Minimal frontend

## Requirements

Install Yarn
https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable

## Build steps

```
composer install
yarn

# Lint PHP code with pint
php vendor/bin/pint --test -v

# Lint JS code with eslint
yarn lint

# Run test cases
php artisan test
```
