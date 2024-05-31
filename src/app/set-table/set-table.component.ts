import { Component, OnInit, ViewChild } from '@angular/core';
import { tableConfig } from './tableConfig';
import { AuthService } from 'src/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableComponent } from '../../app/table/table.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-set-table',
  templateUrl: './set-table.component.html',
  styleUrls: ['./set-table.component.scss']
})
export class SetTableComponent implements OnInit {
  @ViewChild(TableComponent) tablecomponent!: TableComponent;
  config = tableConfig;
  userId = '';
  buttonName = 'Submit';
  userForm: FormGroup;
  visible: boolean = false;
  deleteAlert: boolean = false;
  editData = '';
  data = '';
  list: any = [];
  deleteList: any = [];
  constructor (
    private authServier: AuthService,
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
    })
  }
  cancelDelete() {
    this.deleteAlert = false;
    this.deleteList = [];
  }
  deleteUser() {
    this.authServier.deleteUser(this.userId).subscribe((res) => {
      this.deleteAlert = false;
      this.loadList();
    });
    if (this.deleteList.length) {
      const deleteIds = this.deleteList.map((x: any) => x.id);
      if (deleteIds.length) {
        const req = this.authServier.deletePosts(deleteIds)
        forkJoin(req).subscribe(
          (results) => {
            this.loadList();
            this.deleteAlert = false;
            console.log('All delete requests completed', results);
          },
          (error) => {
            console.error('Error deleting posts', error);
          }
        );
      }
    }
  }
  updateList() {
    this.tablecomponent.UpdateValue();
  }
  updateFromTable(event: any) {
    if (event) {
      this.deleteAlert = true;
      this.deleteList = event;
    }
  }
  validForm(form: any) {
    return this.list.some(
      (a :any) =>
        a.name === form.value.name &&
        a.category === form.value.category
    );
  }
  updateValue() {
    console.log('adsfasf', this.userForm.value)
  }
  async submitForm() {
    console.log('adfa', this.userForm.controls);
    if (this.userId) {
      console.log('dsafaf', this.userForm.value);
      this.authServier.updateUser(this.userForm.value, this.userId).subscribe(async (res: any) => {
        if (res) {
          setTimeout(() => {
            this.loadList();
            this.visible = false;
          }, 1000);
        }
      })
    }
    if (this.userForm.valid && !this.userId) {
      const payload = this.userForm.value;
      this.authServier.addUser(payload).subscribe(async (res: any) => {
        if (res) {
          setTimeout(async () => {
            this.loadList();
            this.visible = false;
          }, 1000);
        }
      })
    }
  }
  addUser() {
    this.buttonName = 'Submit';
    this.userId = '';
    this.userForm.reset();
    this.visible = true;
    // this.authServier.addUser(payload).subscribe((res: any) => {
    //   this.visible = true;
    //   this.data = res;
    // });
  }
  actionFromTable(event: any) {
    this.userId = event.data.id;
    switch (event.type) {
      case 'edit':
        this.buttonName = 'Update'
        this.visible = true;
        this.userForm.patchValue(event.data);
        return;
      case 'delete':
        this.deleteAlert = true;
        return;
        // this.authServier.deleteUser(this.userId).subscribe((res: any) => {

        // })
    }
  }
  changearray() { 
    // for (var i = 0; i < 3; i++) {
    //   setTimeout(() => console.log(i), 1);
    // }
    // for (let i = 0; i < 3; i++) {
    //   setTimeout(() => console.log(i), 1);
    // }
  }
  loadList() {
    this.authServier.listUsers().subscribe(
      (res: any) => {
        this.list = res || [];
      },
      (error) => {
        console.error('Error loading user list:', error);
      }
    );
  }
  async ngOnInit() {
    this.loadList();
    this.changearray();
  }
}
