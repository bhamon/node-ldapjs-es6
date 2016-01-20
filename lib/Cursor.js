'use strict';

const MEMBER_NATIVE = Symbol('native');

class Cursor {
	constructor(p_native) {
		Object.defineProperty(this, MEMBER_NATIVE, {value:p_native});
	}

	forEach(p_cb) {
		let self = this;
		return new Promise(function(p_resolve, p_reject) {
			self[MEMBER_NATIVE].on('searchEntry', (p_entry) => p_cb(p_entry));
			self[MEMBER_NATIVE].on('error', (p_error) => p_reject(p_error));
			self[MEMBER_NATIVE].on('end', (p_result) => p_resolve(p_result));
		});
	}

	toArray() {
		let results = [];
		return this
			.forEach((p_entry) => results.push(p_entry))
			.then((p_result) => {
				if(p_result.status) {
					return Promise.reject(p_result);
				}

				return results;
			});
	}
}

module.exports = Cursor;