/*input should be an inputStream object */
function TokenStream(input) {
	this.current = null;
	this.keywords = "if then else function true false".split(" ");
	this.input = input;
	console.log(this.readNext());
}

var proto = TokenStream.prototype;

// If the callback returns true keep going
// Then return string, this is a pivitol function of our tokenizer, this will chop up the main string into substrings
proto.readWhile = function(predicate) {
	var str = "";
	while (!this.input.eof() && predicate(this.input.peek())) {
		str += this.input.next();
	}
	return str;
}

proto.isKeyword = function(x) {
	return this.keywords.indexOf(x) >= 0
}

proto.isWhitespace = function(ch) {
	return " \t\n".indexOf(ch) >= 0;
}

proto.skipComment = function() {
    this.readWhile(function(ch){ return ch != "\n" });
    this.input.next();
}

proto.readEscaped = function(end) {
	var escaped = false,
		str 	= "";

	// We're currently sitting before the " so move forward one
	this.input.next()
	while (!input.eof()) {
		var ch = this.input.next();
		if (escaped) {
			str += ch;
			escaped = false;
		} else if (ch == "\\") {
			escaped = true;
		} else if (ch == end) {
			break;
		} else {
			str += ch;
		}
	}
	return str;

}

proto.readString = function() {
	var that = this;
	return { type: "str", value: that.readEscaped('"') };
}	



proto.readNext = function() {
	/* Skip past any whitespace, tabs or newlines*/
	this.readWhile(this.isWhitespace);
	if (this.input.eof()) return null;
	var ch = this.input.peek();
	if (ch == "/" && this.input.input.charAt(this.input.pos + 1) == "/") {
		this.skipComment()
		return this.readNext()
	}
	if (ch == '"') return this.readString();

	return this.input.peek();
}

module.exports = TokenStream;