import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailGuard implements CanActivate {
  constructor(private api : ApiService, private http : HttpClient, private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const emailVerfiy = this.api.emailVerfication()
      console.log('in emailguard',emailVerfiy)
      if(emailVerfiy){
        return true;
      }
      else{
        this.router.navigate(['/register'])
        return false
      }
    
  }
  
}
