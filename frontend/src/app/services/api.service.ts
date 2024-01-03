import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  registerurl = 'http://localhost:8080/user/register'
  loginURL = 'http://localhost:8080/user/login'
  dashboardURL = 'http://localhost:8080/user/dashboard'
  emailURL = 'http://localhost:8080/user/verify-email'

  constructor(private http : HttpClient) { }

  createUser(user: Partial<{ name: string | null; email: string | null; password: string | null; }>):Observable<any>{
    return this.http.post(`${this.registerurl}`, user)

  }

  loginUser(users: Partial<{ email: string | null; password: string | null; }>):Observable<any>{
    return this.http.post(`${this.loginURL}`, users)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(){
    return !!this.getToken()
  }

  logOut(){
    return localStorage.removeItem('token')
  }

  //dashboardURL

  dashboardGET():Observable<any>{
    return this.http.get(`${this.dashboardURL}`)
  }


  //emailverficationAPI

  private isEmailVerified = false;


  emailVerfication(){
    this.http.get(`${this.emailURL}`).subscribe(res=>{
      console.log(res)
    })
    return this.isEmailVerified = true
  }



}
