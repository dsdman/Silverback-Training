import { Component } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{

 
  constructor(private router: Router) {

  }

  ngOnInit() {
   
  }


}