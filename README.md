# Meitrics npm package

The NPM package for Meitrics with node

```js
import express from 'express';
const app = express();

import Meitrics from 'meitrics';

const log = Meitrics({
	publicKey: 'PUBLIC_KEY',
	secretKey: 'SECRET_KEY'
});

app.get('/', (req, res) => {
	try {
		aFunctionThatMightCrash();
	} catch (error) {
		log.error({ url: '/', message: 'Something went wrong' });
	}
});

app.listen(3000, () => {
	log.info({ message: 'Server is up and running' });
});
```
