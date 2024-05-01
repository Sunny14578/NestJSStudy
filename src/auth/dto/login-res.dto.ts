export type LoginResDto = {
    accessToken: string;
    refreshToken: string;
    user: {
        id: number;
        name: string;
        email: string;
        phone: string;
    }
}