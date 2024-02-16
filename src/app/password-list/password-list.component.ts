import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site } from '../websites-list/websites-list.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AES, enc } from 'crypto-js';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss']
})

export class PasswordListComponent implements AfterViewInit {
  Website: Site = new Site();
  displayedColumns: string[] = ['sr', 'email', 'username', 'password', 'actions'];
  dataSource = new MatTableDataSource<any>();
  i: number = 0;
  decryptedPasswords: string[] = [];

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private route: ActivatedRoute, private toastr: ToastrService, private fb: FormBuilder, private passwordManagerService: PasswordManagerService) {
    this.route.queryParams.subscribe((val: any) => {
      this.Website = val;
    });
    this.LoadPasswords();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  password: any = {};
  PasswordForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    user_name: [''],
    passwords: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.PasswordForm.valid) {
      if (!this.password.id) {
        this.PasswordForm.get('passwords')?.setValue(this.EncryptPassword(this.PasswordForm.get('passwords')?.value));
        this.passwordManagerService.AddPassword(this.PasswordForm.value, this.Website.id)
          .then(() => {
            this.EncryptPassword(this.password.passwords)
            this.toastr.success("Success", "Password Saved Successfully");
            this.ResetEverything();
          })
          .catch((err: Error) => {
            this.toastr.error("Error", `${err}`);
          });
      } else {
        const form_value = this.PasswordForm.value;
        const is_identical = Object.keys(form_value).every(key => form_value[key] === this.password[key]);

        if (!is_identical) {
          this.passwordManagerService.UpdatePassowrd(this.Website.id, this.password.id, form_value)
            .then(() => {
              this.toastr.success("Success", "Data Updated Successfully");
              this.ResetEverything();
            })
            .catch((err: Error) => {
              this.toastr.error("Error", `${err}`);
            });
        } else {
          this.toastr.warning("Warning", "Nothing to Update");
          this.ResetEverything();
        }
      }
    } else {
      this.toastr.error("Please fill all required fields", 'Error');
    }
  }

  LoadPasswords() {
    this.passwordManagerService.LoadPasswords(this.Website.id).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  DeletePassword(password: Password) {
    this.passwordManagerService.DeletePassword(this.Website.id, password.id).then(() => {
      this.toastr.show("Success", "Password Deleted")
    }).catch((err: Error) => {
      this.toastr.error("Error", `${err}`)
    })
  }

  EditPassword(password: Password) {
    this.password = password;
    this.PasswordForm.patchValue({
      id: password.id,
      email: password.email,
      user_name: password.user_name,
      passwords: password.passwords
    });
  }

  ResetEverything() {
    this.password = {};
    this.PasswordForm.reset();
  }

  EncryptPassword(password: string) {
    const secret_key = `r;Eoh^UUwHxq/)XT./C@JtnaQ2rO$Jo2#zHe$)tm6<JzQt_V'NP/^Pl)<mwbbL_`;
    return AES.encrypt(password, secret_key).toString();
  }

  DecryptPassword(password: string) {
    const secret_key = `r;Eoh^UUwHxq/)XT./C@JtnaQ2rO$Jo2#zHe$)tm6<JzQt_V'NP/^Pl)<mwbbL_`;
    return AES.decrypt(password, secret_key).toString(enc.Utf8);
  }

  OnDecrypt(i: number, password: string) {
    const decryptedPassword = this.DecryptPassword(password);
    this.decryptedPasswords[i] = decryptedPassword;
  }
}

export class Password {
  id !: string;
  email !: string;
  user_name !: string;
  passwords !: string;
}
