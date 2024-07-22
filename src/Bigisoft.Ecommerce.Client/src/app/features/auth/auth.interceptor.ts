import {HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, from, switchMap, throwError } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import {AuthService} from "./AuthService";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient, private authService: AuthService) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   // Perform checks to avoid infinite loops
  //   if (req.url.includes('/api/auth/refresh-token')) {
  //     return next.handle(req); // Avoid intercepting refresh-token requests
  //   }
  //
  //   // Intercept all other requests
  //   return next.handle(req).pipe(
  //     catchError((error: any) => {
  //       if (error instanceof HttpErrorResponse && error.status === 401) {
  //         // If the error is 401 Unauthorized, try refreshing the token
  //         return this.refreshTokenAndRetry(req, next);
  //       } else {
  //         // For other errors, simply pass them through
  //         return throwError(error);
  //       }
  //     })
  //   );
  // }

  //private refreshTokenAndRetry(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   // Make a request to refresh the token
  //   return this.http.post<any>('/api/auth/refresh-token', {}).pipe(
  //     switchMap((response: any) => {
  //       // If token is refreshed successfully, clone the request with the new token
  //       const clonedRequest = req.clone({
  //         setHeaders: {
  //           Authorization: `Bearer ${response.accessToken}`
  //         }
  //       });
  //       // Retry the request with the new token
  //       return next.handle(clonedRequest);
  //     }),
  //     catchError((refreshError: any) => {
  //       // If refreshing token fails, handle it (e.g., redirect to log in)
  //       console.error('Refresh token error:', refreshError);
  //       // You can handle the error here (e.g., redirect to login page)
  //       return throwError(refreshError);
  //     })
  //   );
  // }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
     catchError((error: any) => {
       if (error instanceof HttpErrorResponse && error.status === 401) {
         // If the error is 401 Unauthorized, try refreshing the token
         return this.sendToken(request, next);
       } else {
         // For other errors, simply pass them through
         return throwError(error);
       }
     })
    );
  }

  private async sendToken(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    try {
      const session = await this.authService.getCurrentSession();
      const token = session?.accessToken;
      console.info("Test:" + token);

      if (token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(authReq).toPromise() as Promise<HttpEvent<any>>;
      } else {
        return next.handle(req).toPromise() as Promise<HttpEvent<any>>;
      }
    } catch (error) {
      console.error('Error getting auth session:', error);
      // Handle the error appropriately
      return next.handle(req).toPromise() as Promise<HttpEvent<any>>;
    }
  }
}
