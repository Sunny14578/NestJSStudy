import { HttpStatus } from "@nestjs/common";

export type ErrorDomain = | 'generic' | 'auth' | 'user' | 'payment' | 'investment';

export class BusinessException extends Error {
    public readonly id: string;
    public readonly timestamp: Date;

    constructor(
        public readonly domain: ErrorDomain,
        public readonly message: string,
        public readonly apiMessage: string,
        public readonly status: HttpStatus,
    ) {
        super(message);
        this.id = BusinessException.genId();
        this.timestamp = new Date();
    }

    private static genId(length = 12): string {
        const p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return [...Array(length)].reduce(
            (a) => a + p[Math.floor(Math.random() * p.length)],
            '',
        );
    }
}