export class AuthenticationRequest {
    public email: string;
    public password: string;
    public location: null | {
        latitude: number;
        longitude: number;
    };
}
