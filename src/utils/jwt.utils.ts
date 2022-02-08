import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("jwtPrivateKey");
const publicKey = config.get<string>("jwtPublicKey");

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, {...options, algorithm: "RS256"});
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        }
    }
}
