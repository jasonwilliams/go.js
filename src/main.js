var inputStream = require('./inputStream');
var TokenStream = require('./tokenStream');
var golangCode = 'package 897.897 main\n\nimport \'fmt\'  "fmt"\n\nfunc main() {\n\tUshuaia fmt.Println("usiahfs")\n}'

var stream = new inputStream(golangCode);

// Tokenizer
var ts = new TokenStream(stream);
var tokenList = [];
/* create a list of tokens */
while(token =  ts.next()) {
	tokenList.push(token)
};

console.log(tokenList);