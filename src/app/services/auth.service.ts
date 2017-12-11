import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { toASCII } from 'punycode';


@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) { 
   return this.http.post('/api/authenticate', 
      JSON.stringify(credentials))
      .map(response => {
        let result = response.json();
        console.log(response.json());
        if(result && result.token){
          localStorage.setItem('token', result.token);
          return true;
        }

        return false;
      });
  }

  logout() { 
    localStorage.removeItem('token');
  }

  isLoggedIn() { 

    return tokenNotExpired();
/*
    let jwtHelper = new JwtHelper();
    let token = localStorage.getItem('token');

    if(!token)
      return false;

    let expDate = jwtHelper .getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);

    console.log("Expiration", expDate);
    console.log("isExpired", isExpired);

    return !isExpired;
    */
  }

  get currentUser(){
    let token = localStorage.getItem('token');
    if(!token)
      return null;
    else
      return new JwtHelper().decodeToken(token);
  }
}

