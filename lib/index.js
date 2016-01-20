'use strict';

const lib = {
	deps:{
		ldap:require('ldapjs')
	},
	Client:require('./Client')
};

const REGEX_ERROR = /^[A-Z]\w+Error$/;

function createClient(p_config) {
	let native = lib.deps.ldap.createClient(p_config);
	return new lib.Client(native);
}

module.exports.parseDN = lib.deps.ldap.parseDN;
module.exports.parseFilter = lib.deps.ldap.parseFilter;
module.exports.parseURL = lib.deps.ldap.parseURL;
module.exports.createServer = lib.deps.ldap.createServer;
module.exports.createClient = createClient;

for(let key in lib.deps.ldap) {
	if(!REGEX_ERROR.test(key)) {
		continue;
	}

	module.exports[key] = lib.deps.ldap[key];
}