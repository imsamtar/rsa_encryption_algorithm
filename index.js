let p1 = prompt("p1?") || 83;
let p2 = prompt("p2?") || 89;
if(!isPrime(p1) || !isPrime(p2)) console.log("error: atleast one is not a prime number")
else {
    let n = p1 * p2;
    let phi = (p1-1)*(p2-1);
    let e = 3;
    let d = ((2*phi)+1)/e;
    while(gcd(e, phi)!=1 || d!=Math.floor(d)){
        e = nextPrime(e);
        d = (2*phi+1)/e;
    }
    console.log("p1 = "+p1);
    console.log("p2 = "+p2);
    console.log("%cn  = "+n, "background: #226666; color: #eeaaaa");
    console.log("Φ  = "+phi);
    console.log("%ce  = "+e, "background: #226666; color: #eeaaaa");
    console.log("d  = "+d);

    let m = 7;
    let c = Math.pow(m, e)%n;
    console.log("m  = "+m);
    console.log("c  = "+c);
    m = bigInt(c).pow(d).mod(n);
    console.log("m  = "+m);
}

function gcd(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number')) 
    return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
    var t = y;
    y = x % y;
    x = t;
    }
    return x;
}
function isPrime(p){
    let is = true;
    for(let i=2;i<p;i++){
        if(p%i===0) is=false;
    }
    if(is) return true;
    else return false;
}
function nextPrime(p) {
    while(true){
        let is = true;
        for(let i=2;i<p+1;i++){
            if((p+1)%i===0) is=false;
        }
        if(is) return p+1;
        else p++;
    }
}