'use strict';

const fetch = require("node-fetch");
class Habbo{

    static async getUser(user){
        //https://www.habbo.com.br/api/user/avatars/check-name?name="
        return await fetch('https://www.habbo.com.br/api/public/users?name=' + user, {
            headers:  {
                host: 'www.habbo.com.br'
            }, method: 'GET'
        }).then(async r => {
			var d=await r.text();
            return r.status;
        }).catch();
    }

    static async checkUser(username){
        return await this.getUser(username).then(async r1 => {
            // se o status for 404 e 200 é pq existe e está banida
            // se o status dos dois for 200 é pq existe e n ta banida
            var r2 = await this.getAvatar(username);
            return (r1 && r2) == 404; // se o resultado dos dois for 404 eh pq o nick ta disponivel
        });
    }

    static async getAvatar(user){
        return await fetch('https://www.habbo.com.br/habbo-imaging/avatarimage?user=' + user, {headers: {
            Host: 'www.habbo.com.br',
        }, method: 'GET'}).then(r => {
            return r.status;
        }).catch();
    }
}
module.exports = Habbo;