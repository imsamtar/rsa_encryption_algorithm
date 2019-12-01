import {RSAEncrypt} from "./RSAEncrypt.js";

let msgText = document.getElementById("msg");
let cypherText = document.getElementById("cypher");
let publicKeyText = document.getElementById("publickey");
let encrypt = document.getElementById("encrypt");
let msg2Text = document.getElementById("msg2");
let privateKeyText = document.getElementById("privatekey");

function encryptMsg(){
    let msg = msgText.value;
    publicKeyText.value = rsa.getPublicKey();
    cypherText.value = rsa.encryptString(msg);
    decryptMsg(cypherText.value);
}

msgText.onkeyup = encryptMsg;
encrypt.onclick = encryptMsg;

function decryptMsg(cypher){
    if(!cypher)
        msg2Text.value = "";
    else 
        msg2Text.value = rsa.decryptString(cypher);
    privateKeyText.value = rsa.getPrivateKey();
}
let rsa = new RSAEncrypt();
rsa.onReady = encryptMsg;
setTimeout(() => rsa.generateKeys(512), 10);
