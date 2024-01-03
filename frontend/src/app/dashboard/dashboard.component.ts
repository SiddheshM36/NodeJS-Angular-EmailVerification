import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router : Router, private api : ApiService){
    this.api.dashboardGET().subscribe(res=>{
      console.log(res)
    })
  }

  


}
