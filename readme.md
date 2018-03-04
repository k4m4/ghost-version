# ghost-version [![Build Status](https://travis-ci.org/k4m4/ghost-version.svg?branch=master)](https://travis-ci.org/k4m4/ghost-version)

> Retrieve which version of the Ghost publishing platform a site is using.

## Install

```
~ ❯❯❯ npm install --save ghost-version
```


## Usage

```js
const ghostVersion = require('ghost-version');

ghostVersion('nikolaskama.me').then(ghost_version => {
	console.log(ghost_version);
	//=> '1.19'
});

ghostVersion('google.com').then(ghost_version => {
	console.log(ghost_version);
	//=> 'Target doesn\'t seem to be using Ghost'
});
```


## API

### ghostVersion(targets, [options])

Returns a `Promise` for the version of Ghost of the `targets`.

#### targets

Type: `string` `Array`

One or more targets to check. Can either be a full [URL](https://nodejs.org/api/url.html) like `https://hostname` or just `hostname`. When the protocol is missing from a target `http` is assumed.

#### options

##### timeout

Type: `number`

Timeout in milliseconds after which a request is considered failed. Default: `5000`.


## License

MIT © [Nikolaos Kamarinakis](https://nikolaskama.me/)