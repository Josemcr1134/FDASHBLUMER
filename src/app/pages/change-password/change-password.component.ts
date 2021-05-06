import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  password = new FormControl('', [Validators.required, Validators.email]);
  password1 = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  Twohide =  true
  constructor() { }

  ngOnInit(): void {
    console.log("hola")
  }
  getErrorMessage() {
    if (!this.password1.value === this.password.value) {
      return 'Las contraseñas no coinciden';
    } 

  }
}
