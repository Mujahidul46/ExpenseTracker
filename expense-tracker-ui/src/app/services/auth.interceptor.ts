import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core/primitives/di";
import { Router } from "@angular/router";
import { catchError } from "rxjs/internal/operators/catchError";
import { tap, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const token = localStorage.getItem('authToken');
    const authService = inject(AuthService);
    const router = inject(Router);
    
    if (token) {
        const clonedRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(clonedRequest).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    const refreshedToken = event.headers.get('New-Auth-Token');
                    if (refreshedToken) {
                        localStorage.setItem('authToken', refreshedToken);
                    }
                }
            }),
            catchError(error => {
                if (error.status === 401) { // token expired
                    authService.LogOut();
                    router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );
    }

    return next(request);
}