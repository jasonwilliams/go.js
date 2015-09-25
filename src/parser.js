function Parser() {

}


/** Take a start token, an end token, a separator and a fuction to parse whatever is inbetween
*
* @param {string} startToken
* @param {string} endToken
* @param {string} separator 
* @param {object} parser  
* @returns {array} list of arguments 
*/
function delimited(start, stop, separator, parser) {
	var a = [],
		first = true;

	skip_punc(start);
	while (!input.eof()) {
		if (is_punc(stop)) break;
		if (first) first = false; else skip_punc(separator);
		if (is_punc(stop)) break;
		a.push(parser());
	}
	skip_punc(stop);
	return a;
}

function parse_if() {
	skip_kw("if");
	var cond = parse_expression();
	skip_punc("{")
	var then = parse_expression();
	var ret = { type: "if", cond: cond, then: then};
	if (is_kw("else")) {
		input.next();
		ret.else = parse_expression();
	}
	return ret;
}

function parseTopLevel() {
	var prog = [];
	while (!input.eof()) {
		prog.push(parse_expression());
		if (!input.eof()) skip_punc(";");
	}
	return { type: "prog", prog: prog };
}

function parse_func() {
	return {
		type: "func",
		vars: delimited("(", ")", ",", parse_varname),
		body: parse_expression()
	};
}