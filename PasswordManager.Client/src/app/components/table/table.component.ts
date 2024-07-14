import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPassword } from '../../models/password';
import { ModalService } from '../../services/modal.service';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  DeleteBtn(id: number | undefined) {
    console.log(
      this.password.id,
      this.password.name,
      this.password.textPassword
    );
    this.passwordService.delete(id).subscribe(() => {
      this.modalService.close();
    });
    setTimeout(() => {
      window.location.reload(), 1000;
    });
  }

  constructor(
    public modalService: ModalService,
    private passwordService: PasswordService
  ) {}

  @Input() password: IPassword;
  type = false;
}
