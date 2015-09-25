var inputStream = require('./inputStream');
var TokenStream = require('./tokenStream');
var golangCode = 'package main\n\nimport \'fmt\'  "fmt"\n\nfunc main() {\n\tUshuaia fmt.Println("usiahfs")\n}'

var stream = new inputStream(golangCode);

// Tokenizer
var ts = new TokenStream(stream)
while(token =  ts.next()) {
	console.log(token);
};
