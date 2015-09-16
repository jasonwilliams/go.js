/*input should be an inputStream object */
function TokenStream(input) {
	this.current = null;
	this.keywords = "if then else function true false".split(" ");
	this.input = input;
	console.log(this.readNext());
}

var proto = TokenStream.prototype;

proto.isKeyword = function(x) {
	return this.keywords.indexOf(x) >= 0
}

proto.isWhitespace = function(ch) {
	return " \t\n".indexOf(ch) >= 0;
}

// If the callback returns true keep going
// Then return string, this is a pivitol function of our tokenizer, this will chop up the main string into substrings
proto.readWhile = function(predicate) {
	var str = "";
	while (!this.input.eof() && predicate(this.input.peek())) {
		str += this.input.next();
	}
	return str;
}

proto.readNext = function() {
	/* Skip past any whitespace, tabs or newlines*/
	this.readWhile(this.isWhitespace);
	if (this.input.eof()) return null;
	return this.input.peek();
}

module.exports = TokenStream;