class RSAEncrypt {
    constructor(bitLength){
        if(bitLength == undefined) bitLength = 256;
        else if(bitLength<4) bitLength=4;
        else if(bitLength>1024) bitLength=1024;
        this.private = { p: this.getPrime(bitLength), q: this.getPrime(bitLength) };
        this.private.n = this.private.p*this.private.q;
        this.private.phi = (this.private.p-1n) * (this.private.q-1n);
        this.private.d = 2n*this.private.phi+1n;
        this.public = { n: this.private.p * this.private.q, e: 3n }
        while(bigInt.gcd(this.private.phi, this.public.e)!=1 || this.private.d%this.public.e!=0n){
            this.public.e = this.nextPrime(this.public.e);
        }
        this.private.d/=this.public.e;
    }
    minmax(bitLength){
        this.max = 2n ** BigInt(bitLength) - 1n;
        this.min = 10n;
        let n = this.max;
        while(n/10n > BigInt(10n)){
            this.min*=10n;
            n/=10n;
        }
        return { min: this.min, max: this.max };
    }
    nextPrime(n){
        if(n%2n==0) n++;
        while(true){
            n+=2n;
            if(bigInt(n).isProbablePrime())
                return n;
        }
    }
    nextProbablePrime(n){
        if(n%2n==0n) n--;
        if(n<this.max || (n==this.max && bigInt(n).isProbablePrime()))
            while(!bigInt(n).isProbablePrime())
                n+=2n;
        else return this.nextProbablePrime(this.min);
        return n;
    }
    getPrime(bitLength){
        this.minmax(bitLength);
        let n = BigInt(bigInt.randBetween(this.min.toString(), this.max.toString()));
        return this.nextProbablePrime(n);
    }
    gcd(x, y) {
        while(y) {
            let t = y;
            y = x % y;
            x = t;
        }
        return x;
    }
    getPublicKey(){
        return this.public.n+"+"+this.public.e;
    }
    getPrivateKey(){
        return `${this.private.d}`;
    }
    encryptInt(data){
        return BigInt(data) ** this.public.e % this.public.n;
    }
    encryptString(str){
        let cypherText = "";
        for(let char of str){
            cypherText+=this.encryptInt(char.charCodeAt(0))+".";
        }
        cypherText = cypherText.slice(0, cypherText.length-1);
        return cypherText;
    }
    decryptInt(cypher){
        // this.private.d = 2;
        // return `${this.private.d}`;
        return bigInt(cypher).modPow(`${this.private.d}`, `${this.public.n}`).toString();
    }
    decryptString(cypher){
        let str = "";
        cypher = cypher.split(".");
        for(let c of cypher){
            str+=String.fromCharCode(this.decryptInt(c));
        }
        return str;
    }
}

let rsa = new RSAEncrypt(10);

let msgText = document.getElementById("msg");
let cypherText = document.getElementById("cypher");
let publicKeyText = document.getElementById("publickey");
let encrypt = document.getElementById("encrypt");

let cypher2Text = document.getElementById("cypher2");
let msg2Text = document.getElementById("msg2");
let privateKeyText = document.getElementById("privatekey");
let decrypt = document.getElementById("decrypt");

function update(){
    let msg = msgText.value;
    cypher2Text.innerText = cypherText.innerText = rsa.encryptString(msg);
    publicKeyText.innerText = rsa.getPublicKey();
    decryptMsg();
}

encrypt.onclick = update;

function decryptMsg(){
    let cypher2 = cypher2Text.value;
    msg2Text.innerText = rsa.decryptString(cypher2);
    privateKeyText.innerText = rsa.getPrivateKey();
}

decrypt.onclick = decryptMsg;
update();
