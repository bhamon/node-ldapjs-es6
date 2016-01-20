'use strict';

const lib = {
	Cursor:require('./Cursor')
};

const MEMBER_NATIVE = Symbol('native');
const METHOD_PROMISE_PROXY = Symbol('promiseProxy');

class Client {
	constructor(p_native) {
		Object.defineProperty(this, MEMBER_NATIVE, {value:p_native});
	}

	[METHOD_PROMISE_PROXY](p_method, p_arguments) {
		let native = this[MEMBER_NATIVE];
		return new Promise(function(p_resolve, p_reject) {
			native[p_method].call(native, ...p_arguments, function(p_error, p_result) {
				if(p_error) {
					p_reject(p_error);
				} else {
					p_resolve(p_result);
				}
			});
		});
	}

	search() {
		return this[METHOD_PROMISE_PROXY]('search', arguments)
		.then(function(p_res) {
			return new lib.Cursor(p_res);
		});
	}
}

for(let method of [
	'abandon',
	'add',
	'bind',
	'compare',
	'del',
	'exop',
	'modify',
	'modifyDN',
	'unbind',
	'starttls',
	'destroy',
	'connect'
]) {
	Client.prototype[method] = function() {
		return this[METHOD_PROMISE_PROXY](method, arguments);
	};
}

module.exports = Client;