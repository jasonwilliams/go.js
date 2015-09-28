// Globalize these then close over to make them private
/* tokenStream started off as a huge object, but..
1. "this."" was everywhere, it didn't feel right
2. Half of these functions and properties will never get accessed outside of the constructor, so no point making them public
*/

current = null;
keywords = "";
input = null;

/*input should be an inputStream object */
function TokenStream(sInput) {
	current = null;
	/* keywords taken from: https://golang.org/ref/spec */
	keywords = "case break chan const continue default defer else fallthrough for func go goto if import iterface map package range return select struct switch type var".split(" ");
	input = this.input = sInput;
}

function is_keyword(x) {
	return keywords.indexOf(x) >= 0;
}

function is_digit(ch) {
    return /[0-9]/i.test(ch);
}

function is_id_start(ch) {
    return /[a-z]/i.test(ch);
}

function isOpChar(ch) {
    return "+-*/%=&|<>!:".indexOf(ch) >= 0;
}

function is_id(ch) {
    return is_id_start(ch) || "?!-<>=0123456789".indexOf(ch) >= 0;
}

function read_ident() {
	var id = readWhile(is_id);
	return {
		type : is_keyword(id) ? "kw" : "var",
		value : id
	};
}

// If the callback returns true keep going
// Then return string, this is a pivitol function of our tokenizer, this will chop up the main string into substrings
function readWhile(predicate) {
	var str = "";
	while (!input.eof() && predicate(input.peek())) {
		str += input.next();
	}
	return str;
}

function isKeyword(x) {
	return keywords.indexOf(x) >= 0;
}

function isWhitespace(ch) {
	return " \r\t\n".indexOf(ch) >= 0;
}

function isPunc(ch) {
    return ".,;(){}[]".indexOf(ch) >= 0;
}

function skipComment() {
    readWhile(function(ch){ return ch != "\n"; });
    input.next();
}

function readEscaped(end) {
	var escaped = false,
		str 	= "";

	// We're currently sitting before the " so move forward one
	input.next()
	while (!input.eof()) {
		var ch = input.next();
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

function readString() {
	return { type: "string", value: readEscaped('"') };
}

function readRune() {
	return { type: "rune", value: readEscaped("'") };
}

function read_number() {
	var has_dot = false;
	var number = readWhile(function(ch) {
		if (ch == ".") {
			if (has_dot) return false;
			has_dot = true; // There's a . in this number string, but it's the first one we've come across, so lets keep going
			return true;
		}
		return is_digit(ch);
	});
	if (has_dot) {
		return { type: "float64", value: parseFloat(number) };
	} else {
		return { type: "int", value: parseInt(number)}
	}
}





function readNext() {
	/* Skip past any whitespace, tabs or newlines*/
	readWhile(isWhitespace);
	if (input.eof()) return null;
	var ch = input.peek();
	/* if we get a / check the next character is also a /, if so we are in a comment */
	if (ch == "/" && input.input.charAt(input.pos + 1) == "/") {
		skipComment()
		return readNext()
	}
	if (ch == '"') return readString();
	if (ch == "'") return readRune();

	if (is_digit(ch)) return read_number();
	if (is_id_start(ch)) return read_ident();
    if (isPunc(ch)) return {
    	type  : "punc",
    	value : input.next()
	};
	if (isOpChar(ch)) return {
		type : "op",
		value : readWhile(isOpChar)
	};
	input.croak("can't handle character: " + ch);

	return input.peek();
}

TokenStream.prototype.peek = function() {
    return current || (current = readNext());
}

TokenStream.prototype.next = function() {
	var tok = current;
    current = null;
    return tok || readNext();
}

TokenStream.prototype.eof = function() {
    	return this.peek() == null;
}

TokenStream.prototype.croak = function(msg) {
	throw new Error(msg + " (" + this.input.line + ":" + this.input.col + ")");
};

module.exports = TokenStream;