var Habbo = require('./habbo/checkUser');
const fs = require('fs');

/*
function random(count){f
    var str = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-=?!@:.,';
    for(var i = 0; i < count; i++){
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
}
*/
var cache = []; // do not repeat

var names = fs.readFileSync('names.txt').toString().split("\r");



async function startChecking(){
	console.log("\nTesting",names.length,"names...");
	for(let i=0;i<=names.length;i++){	
		if(fs.readFileSync('available.txt').toString().split("\r").includes("\n"+names[i])){
			console.log(`\x1b[32mNick disponível: ${names[i]}`);
			continue
		}
		else if(fs.readFileSync('rejects.txt').toString().split("\r").includes("\n"+names[i])){
			console.log(`\x1b[31mConta já registrada: ${names[i]}`);
			continue
		}  
		else {
			var isAvailable = await Habbo.checkUser(names[i].replace(/\r?\n|\r/g,""));
			if(isAvailable){
				console.log(`\x1b[32mNick disponível: ${names[i]}`);
				fs.appendFileSync('available.txt',"\r\n"+names[i]);
			}else{
				console.log(`\x1b[31mConta já registrada: ${names[i]}`);
				fs.appendFileSync('rejects.txt',"\r\n"+names[i]);
			}
		}
	}		
}
startChecking();

