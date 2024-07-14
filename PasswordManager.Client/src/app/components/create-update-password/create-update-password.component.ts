import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { PasswordService } from '../../services/password.service';
import { IPassword } from '../../models/password';
import { Observable } from 'rxjs';

@Component({
  selector: 'create-or-update-modal',
  templateUrl: './create-update-password.component.html',
  styleUrl: './create-update-password.component.css',
})
export class CreateOrUpdateComponent implements OnInit {
  ngOnInit(): void {}
  @Input() title: string;
  coincidencePassword = false;

  constructor(
    public modalService: ModalService,
    private passwordService: PasswordService
  ) {}

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.minLength(4),
      Validators.required,
      Validators.email,
    ]),
    textPassword: new FormControl<string>('', [
      Validators.minLength(8),
      Validators.required,
    ]),
  });

  get name() {
    return this.form.controls.name as FormControl;
  }

  get textPassword() {
    return this.form.controls.textPassword as FormControl;
  }

  addEmailValidator() {
    this.form.controls['name'].addValidators([Validators.email]);
    this.form.controls['name'].updateValueAndValidity();
  }

  removeEmailValidator() {
    this.form.controls['name'].removeValidators([Validators.email]);
    this.form.controls['name'].updateValueAndValidity();
  }

  submit() {
    for (let i = 0; i < this.passwordService.passwords.length; i++) {
      if (
        this.form.controls['name'].value ==
        this.passwordService.passwords[i].name
      ) {
        this.coincidencePassword = true;
        break;
      } else if (
        this.form.controls['name'].value !=
        this.passwordService.passwords[i].name
      ) {
        this.coincidencePassword = false;
      }
    }
    if (this.coincidencePassword === false) {
      this.passwordService
        .create({
          name: this.form.value.name as string,
          textPassword: this.form.value.textPassword as string,
        })
        .subscribe(() => {
          this.modalService.close();
        });
      setTimeout(() => {
        window.location.reload(), 1000;
      });
    }
  }
}
