# check-fe-env

keep a consistent development environment between different developers.

will check:

- nodejs version by `.nvmrc`
- package manager type and it's version by the `packageManager` field of package.json

recommend using [corepack](https://nodejs.org/api/corepack.html) to manage the package manager.

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
