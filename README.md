# check-fe-env

keep a consistent development environment between different developers.

will check:

- nodejs version: base on `.nvmrc`
- package manager type and it's version: base on `packageManager` field of package.json

recommend using [fnm](https://github.com/Schniz/fnm) to manage nodejs version and [corepack](https://nodejs.org/api/corepack.html) to manage the package manager.

For Chinese users：[前端如何统一开发环境](https://juejin.cn/post/7325069743143878697)

## Usage

Add following to package.json scripts:

```json
{
  "scripts": {
    "preinstall": "npx check-fe-env"
  }
}
```

## Related Issues

- [enable corepack by default](https://github.com/nodejs/node/issues/50963)
- [Preinstall script runs after installing dependencies](https://github.com/npm/cli/issues/2660)

## Thanks

- [only-allow](https://github.com/pnpm/only-allow) source of inspiration
