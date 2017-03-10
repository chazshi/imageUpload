function say(word){
	console.log(word);
}

function execute(someFunc, value){
	someFunc(value);
}

execute(say,"hello");