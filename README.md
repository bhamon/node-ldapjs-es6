# ldapjs-es6

A tiny wrapper around ldapjs to make it generator compliant.

## How to use

```javascript
'use strict';

const co = require('co');
const ldapjs = require('ldapjs-es6');

co(function*() {
	let client = ldapjs.createClient({
		url:'ldap://localhost'
	});

	yield client.bind('uid=admin,ou=People,dc=service', '*****');
	let cursor = yield client.search('ou=People,dc=gardiansesame', '(sn=SOMEONE)');
	yield cursor.forEach((p_entry) => {
		console.log(p_entry.object);
	});

	yield ldap.unbind();
});
```

## API

The core module conveniently exposes the parsing functions:
- `parseDN()`
- `parseFilter()`
- `parseURL()`

It also provides a full access to the LDAP errors.

### Server

The `Server` API is left unchanged. The `createServer()` function is exposed on the core module.

### Client

A wrapped `Client` instance can be obtained with a call to `createClient()`.

```
Client#abandon() -> Promise
Client#add() -> Promise
Client#bind() -> Promise
Client#compare() -> Promise
Client#del() -> Promise
Client#exop() -> Promise
Client#modify() -> Promise
Client#modifyDN() -> Promise
Client#unbind() -> Promise
Client#starttls() -> Promise
Client#destroy() -> Promise
Client#search() -> Promise<Cursor>
```

### Cursor

This class wraps the event-based LDAP result returned via a call to the `Client#search()` method.

```
Cursor#forEach(p_cb) -> Promise
@param Function p_cb Function called for each result entry.
@returns A promise that resolves to the LDAP operation result (for status check).

Cursor#toArray() -> Promise<Array>
@returns A promise that resolves to the search result array.
```