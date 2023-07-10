import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

function hashMessage(message) {
    return keccak256(utf8ToBytes(message));
}

export default hashMessage;