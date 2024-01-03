import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router : Router, private api : ApiService){}

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required]),
    password : new FormControl('', Validators.required)
    })

    onLoginSubmit(){
        // console.log('login is clicked', this.loginForm.value);
        this.api.loginUser(this.loginForm.value).subscribe(res=>{
          console.log('sid was here: ', res)
          const token = res.data
          if(token){
            //set localstorage
          localStorage.setItem('token', res.data.token)
          // console.log(res.data.token)
          this.router.navigate(['/dashboard'])
              
          }
        
    }
        )
}
}
