import { HttpClient } from "@angular/common/http";
import { baseApiUrl } from "../../environment";
import { User } from "../interfaces/User";
import { Observable, tap } from "rxjs";
import { LoginRequest } from "../interfaces/LoginRequest";
import { LoginResponse } from "../interfaces/LoginResponse";
import { SignUpRequest } from "../interfaces/SignUpRequest";

export class AuthService {
    constructor (private http: HttpClient) {

    }

    // /auth/login
    // store the token in local storage
    public LogIn(loginDetails: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${baseApiUrl}/auth/login`, loginDetails)
        .pipe(
            tap(response => {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('userId', response.userId.toString());
                localStorage.setItem('username', response.username);
                localStorage.setItem('isAdmin', response.isAdmin.toString());
            })
        );
    }

    // /auth/signup
    // username, email , password
    public SignUp(signUpDetails: SignUpRequest) : Observable<void> { // learning point: without observable you cant see if the response succeeded or failed
        return this.http.post<void>(`${baseApiUrl}/auth/signup`, signUpDetails);
    }

    public LogOut(): void {
        // remove token from local storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
    }
}