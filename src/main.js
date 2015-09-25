var inputStream = require('./inputStream');
var TokenStream = require('./tokenStream');
golangCode = '// testing\n package main\n\nimport "fmt"\n\nfunc main() {\n\tUshuaia fmt.Println("usiahfs")\n}'

var stream = new inputStream(golangCode);

// Tokenizer
var ts = new TokenStream(stream)