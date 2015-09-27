function InputStream(input) {
	this.pos 	= 0;
	this.line 	= 1;
	this.col 	= 0;
	this.input = input;
}


InputStream.prototype.next = function() {
	var ch = this.input.charAt(this.pos++);
	if (ch == "\n") {
		/* newline */
		this.line++;
		this.col = 0;
	} else {
		this.col++;
	}

	return ch;
};

InputStream.prototype.peek = function() {
	return this.input.charAt(this.pos);
};

InputStream.prototype.eof = function() {
	return this.peek() === "";
};

InputStream.prototype.croak = function(msg) {
	throw new Error(msg + " (" + this.line + ":" + this.col + ")");
};

module.exports = InputStream;