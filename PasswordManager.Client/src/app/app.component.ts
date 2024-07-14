import { Component, OnInit } from '@angular/core';
import { IPassword } from './models/password';
import { PasswordService } from './services/password.service';
import { ModalService } from './services/modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  passwordEdit() {
    console.log(this.passwordService.passwords);
  }
  title = 'PasswordManager.Client';
  passwords$: Observable<IPassword[]>;
  search = '';
  statusModalWin: string;

  constructor(
    public passwordService: PasswordService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.passwordService.getAll().subscribe();
  }
}
