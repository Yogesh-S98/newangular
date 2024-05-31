import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: any = 'http://localhost:3000/user';
  constructor(private http:HttpClient) { }
  listUsers() {
    return this.http.get(this.url);
  }
  updateUser(payload: any, userId: any) {
    return this.http.put(`${this.url}/${userId}`, payload);
  }
  addUser(user: any) {
    return this.http.post(this.url, user);
  }
  deleteUser(userId: any) {
    return this.http.delete(`${this.url}/${userId}`);
  }
  deletePosts(ids: number[]) {
    return ids.map(id => this.deleteUser(id));
  }
  sendFile(value: any) {
    // value.forEach((value:any, key) => {
    //   console.log('dsa', key, value);
    // });
    const formData = new FormData();
    formData.set('file', value.file);
    const url = 'http://localhost:8080/api/file/upload';
    return this.http.post<any>(url, formData).subscribe(
      (res) => console.log('ds', res),
    );
  }
}
