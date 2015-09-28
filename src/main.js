var fs			= require('fs')
var inputStream = require('./inputStream');
var TokenStream = require('./tokenStream');
var parse 		= require('./parser');
var golangCode = '';
fs.readFile('test.go', 'utf8', function(err, data) {
	if (err) {
		console.log('error', err)
	}
	var stream = new inputStream(data);

	// Tokenizer
	var ts = new TokenStream(stream);

	// while (ts.peek()) {
	// 	console.log(ts.next());
	// }
	
	console.dir(parse(ts));

});
