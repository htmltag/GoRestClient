import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GorestService } from '../services/gorest.service';
import { User } from '../models/user';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {

  areYouSure = false;

  genders: string[] = [
    'male',
    'female'
  ];

  statuses: string[] = [
    'active',
    'inactive'
  ];

  userForm!: FormGroup;
  name!: FormControl;
  email!: FormControl;
  gender!: FormControl;
  status!: FormControl;

  constructor(private goRest: GorestService) {}


  ngOnInit(): void {
    this.generateFormControls();
    this.generateForm();
  }

  generateFormControls() {
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]);
    this.gender = new FormControl('', Validators.required);
    this.status = new FormControl('', Validators.required);
  }

  generateForm() {
    this.userForm = new FormGroup({
      name: this.name,
      email: this.email,
      gender: this.gender,
      status: this.status
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      if(!this.areYouSure) {
        console.log("Show dialog!");
        const dialog = document.querySelector("dialog");
        dialog?.showModal();
      } else {
        console.log("Form Submitted!");
        console.log("User: " + JSON.stringify(this.userForm.value));
        
        this.goRest.addUser(this.userForm.value as User)
        .pipe(
          catchError((error) => {
            console.log("Error when adding user: " + error);

            return of(null)
          })
        )
        .subscribe((data) => {
          console.log("User added success!");
        })
        this.userForm.reset();
      }
    }
  }

  onCancel() {
    const dialog = document.querySelector("dialog");
    dialog?.close();
  }

  onAccept() {
    const dialog = document.querySelector("dialog");
    dialog?.close();
    this.areYouSure = true;
    this.onSubmit();
  }

}
