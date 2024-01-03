import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ApiService } from '../services/api.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router : Router, private api : ApiService, private http : HttpClient){}

  registerForm = new FormGroup({
      name : new FormControl('',Validators.required),
      email : new FormControl('',[Validators.required]),
      password : new FormControl('',Validators.required)
  })

  onRegisterSubmit(){
      console.log('register success');
      this.api.createUser(this.registerForm.value).subscribe(res=>{
        console.log('resgiter component: ' , res)
        // this.router.navigate(['/login'])

      })


    return this.router.navigate(['/register'])
    
  }
  

}
