export type RequestInfo = {
    ip: string;
    ua: string;
    endpoint: string;
};

export type TokenPayload = {
    sub: number;
    iat: number;
    jti: string;
}