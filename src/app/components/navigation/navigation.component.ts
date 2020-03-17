import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;

  LoginFormGroup = new FormGroup({
    passwordControl: new FormControl('', Validators.required),
    userIdControl: new FormControl('', Validators.required)
  });
  userData = {
    isLoggedIn: false,
    userName: ''
  };
  usersDB = [
    { userid: 'abc@media.com', password: 'abc123', username: 'tom' },
    { userid: 'def@media.com', password: 'def123', username: 'dick' }
  ];
  constructor() {
    let temp = JSON.parse(localStorage.getItem('userData'));
    if (temp)
      this.userData = temp;
  }

  ngOnInit() {
  }
  cancel = () => {
    this.closeModal.nativeElement.click();
    this.LoginFormGroup.reset();
  }

  isLoggedIn = false;
  userName
  Login = () => {
    this.usersDB.forEach(element => {
      if (this.LoginFormGroup.value.userIdControl == element.userid &&
        this.LoginFormGroup.value.passwordControl == element.password) {
        this.userData.isLoggedIn = true;
        this.userData.userName = element.username;
        localStorage.setItem('userData', JSON.stringify(this.userData));
        this.closeModal.nativeElement.click();
        return;
      }
    });
  }
  logout = () => {
    this.userData.isLoggedIn = false;
    this.userData.userName = null;
    localStorage.clear();
  }
}
