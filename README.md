# check-fe-env

keep a consistent development environment between different developers.

will check:

- nodejs version: base on `.nvmrc`
- package manager type and it's version: base on `packageManager` field of package.json

recommend using [fnm](https://github.com/Schniz/fnm) to manage nodejs version and [corepack](https://nodejs.org/api/corepack.html) to manage the package manager.

## Usage

Add following to package.json scripts:

```json
{
  "scripts": {
    "preinstall": "npx check-fe-env"
  }
}
```

## Thanks

- [only-allow](https://github.com/pnpm/only-allow) source of inspiration
