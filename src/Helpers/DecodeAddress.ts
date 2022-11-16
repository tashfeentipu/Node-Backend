import * as ethUtil from 'ethereumjs-util';
import Web3 from "web3";

export const DecodeAddress = (msgToSign: string, txHash: string) => {
    const msgBuffer = ethUtil.toBuffer(Web3.utils.toHex(msgToSign));
    const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
    const signatureParams = ethUtil.fromRpcSig(txHash);
    const publicKey = ethUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s
    );
    const addressBuffer = ethUtil.publicToAddress(publicKey);
    return ethUtil.bufferToHex(addressBuffer);
}

export const nonceString = (nonce: string) => {
    return `I want to sign ${nonce}`
}