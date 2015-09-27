var inputStream = require('./inputStream');
var TokenStream = require('./tokenStream');
var parse 		= require('./parser');
var golangCode = 'package jason\nimport ("fmkjt" "jason")  "fmt"\n\nfunc main() {}';

var stream = new inputStream(golangCode);

// Tokenizer
var ts = new TokenStream(stream);

console.dir(parse(ts).prog);