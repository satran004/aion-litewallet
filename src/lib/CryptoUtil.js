import bip39 from 'bip39';
// import sodium from 'libsodium-wrappers-sumo';
// import './sodium.js';
import sha512 from 'js-sha512';
import * as blake from "blakejs";


class CryptoUtil {

    static generateMnemonic() {
        const mnemonic = bip39.generateMnemonic(128) ;

        return mnemonic;
    }

    static mnemonicToSeed(mnemonic) {
        const seed = bip39.mnemonicToSeed(mnemonic);

        return seed;
    }

    static privateKey(seed) {
        var ed25519 = window.sodium.from_string("ed25519 seed");
        return sha512.hmac(ed25519, seed);
    }

    static generateAddress(pvKey) {

         var pvkeyBytes;

         try {
             pvkeyBytes = window.sodium.from_hex(pvKey);
         } catch(Error) {
             pvkeyBytes = window.sodium.from_hex(pvKey);
         }

        const pubKeyBytes = window.sodium.crypto_sign_ed25519_sk_to_pk(pvkeyBytes);

        return this.computeAddress(pubKeyBytes);
    }

    static computeAddress(pubKeyBytes) {
        let blakePub = blake.blake2b(pubKeyBytes, 0,32);
        let a0Byte = window.sodium.from_hex('A0')[0];

        let  buffer = new ArrayBuffer(32);

        var array = new Uint8Array(32);
        array[0] = a0Byte;
        for(var i=1; i<=31;i++) {
            array[i] = blakePub[i];
        }

        return window.sodium.to_hex(array);
    }

}

export default CryptoUtil;
