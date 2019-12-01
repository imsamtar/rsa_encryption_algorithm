export class RSAEncrypt {
    constructor(bitLength, onReady){
        if(onReady!=undefined) this.onReady = onReady;
        if(bitLength!=undefined) this.generateKeys(bitLength);
    }

    generateKeys(bitLength) {
        if(bitLength == undefined || bitLength<8 || bitLength>1024) bitLength=256;
        this.minmax(bitLength);
        do {
            do {
                this.private = { p: this.getProbablePrime(bitLength), q: this.getProbablePrime(bitLength) };
            } while(this.private.p==this.private.q)
            this.private.phi = (this.private.p - 1n) * (this.private.q - 1n);
            this.private.d = 2n * this.private.phi + 1n;
            this.public = { n: this.private.p * this.private.q, e: 3n };
            while (this.public.e<100000 && (bigInt.gcd(this.private.phi, this.public.e) != 1 || this.private.d % this.public.e != 0n)){
                this.public.e = this.nextE(this.public.e);
            }
            if(this.public.e>=100000) continue;
            this.private.d /= this.public.e;
        } while((this.private.d == 1n || this.decryptInt(this.encryptInt(212))!=212) && function(){console.log("Retrying...");return true;}());
        if(this.onReady!=undefined) this.onReady();
    }

    encryptInt(data){
        return BigInt(data) ** this.public.e % this.public.n;
    }

    encryptString(str){
        let cypherText = "";
        for(let char of str){
            cypherText+=this.encryptInt(char.codePointAt())+"$";
        }
        cypherText = cypherText.slice(0, cypherText.length-1);
        return cypherText;
    }

    decryptInt(cypher){
        return bigInt(cypher).modPow(`${this.private.d}`, `${this.public.n}`).toString();
    }

    decryptString(cypher){
        let str = "";
        cypher = cypher.split("$");
        for(let c of cypher){
            str+=String.fromCodePoint(this.decryptInt(c));
        }
        return str;
    }

    minmax(bitLength){
        this.max = 2n ** BigInt(bitLength) - 1n;
        this.min = 2n ** BigInt(bitLength - 1);
        return { min: this.min, max: this.max };
    }

    nextE(e){
        if(e%2n==0 && bigInt(++e).isProbablePrime()) return e;
        else do { e+=2n } while(!bigInt(e).isProbablePrime());
        return e;
    }

    nextProbablePrime(n){
        if(n%2n==0n) n++;
        while(n<=this.max && !bigInt(n).isProbablePrime())
            n+=2n;
        if(n>this.max || n<this.min)
            return this.nextProbablePrime(this.min);
        else return n;
    }

    getProbablePrime(bitLength){
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
}
