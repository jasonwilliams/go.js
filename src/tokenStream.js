/*input should be an inputStream object */
function TokenStream(input) {
	this.current = null;
	this.keywords = " if then else function true false";
	console.log(input.next());
}

module.exports = TokenStream;