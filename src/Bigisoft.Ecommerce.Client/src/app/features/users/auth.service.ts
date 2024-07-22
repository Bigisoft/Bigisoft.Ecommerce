import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  userPool = new CognitoUserPool({
    UserPoolId: environment.cognito.userPoolId,
    ClientId: environment.cognito.userPoolClientId,
  });

  constructor(private http: HttpClient) { }

  signUp(username: string, email: string, password: string): Promise<any> {
    let attributeList: CognitoUserAttribute[] = [];

    if (email) {
      attributeList.push(new CognitoUserAttribute({ Name: 'email', Value: email }));
    }

    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, attributeList, [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  signIn(username: string, password: string): Promise<any> {
    const authenticationData = {
      Username: username,
      Password: password
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: username,
      Pool: this.userPool
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result: CognitoUserSession) => {
          //this.http.post('/api/auth/sign-in', { username, password }).subscribe();
          resolve(result);
        },
        onFailure: (err: CognitoUserSession) => {
          reject(err);
        }
      });
    });
  }

  signOut(): void {
    const cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
  }

  isAuthenticated(): boolean {
    const cognitoUser = this.userPool.getCurrentUser();
    return !!cognitoUser;
  }

  refreshToken() {
    return this.http.post('/api/auth/refresh-token', {}, { withCredentials: true });
  }
}
