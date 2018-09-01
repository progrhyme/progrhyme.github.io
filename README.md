# progrhyme's site

My personal landing page - https://progrhy.me .

## Branches

- `src` ... Source codes and materials to build & publish site.
- `master` ... Contents to be published as HTML.

## How to develop

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Gulp](https://gulpjs.com/)
- [GNU make](https://www.gnu.org/software/make/manual/make.html)

### Prepare

```sh
# install node modules
npm install

# clone into subdirectory dist/
git clone -b master git@github.com:progrhyme/progrhyme.github.io.git dist
```

### Build site locally

```sh
gulp
```

This creates whole site contents under `dist/`.  
You can browse <u>dist/index.html</u> to check if it is fine.

Alternatively, you can run `make build` to build the site.

### Publish

```sh
make
```

This runs `gulp` command and `git push` to the master branch.

## Theme

This site is powered by the awsome [Bootstrap](http://getbootstrap.com/) theme
[Grayscale](http://startbootstrap.com/template-overviews/grayscale/) which is created by
[Start Bootstrap](http://startbootstrap.com/).

## Copyright

Copyright &copy; progrhyme 2018
