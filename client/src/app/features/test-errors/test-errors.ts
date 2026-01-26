import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {HttpClient} from '@angular/common/http';

// componente para testar erros. as boas praticas
// mandam que os metodos devessem passar por um
// serviço, mas como é só para testar, vai mesmo direto daqui.

@Component({
  selector: 'app-test-errors',
  imports: [MatButton],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css',
})
export class TestErrors {
  baseUrl: string = 'https://localhost:5001/api/';
  private http  = inject(HttpClient);
  validationErrors?: string[];

  get404Error = () => {
    this.http.get(`${this.baseUrl}buggy/notfound`).subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    })
  }

  get400Error = () => {
    this.http.get(`${this.baseUrl}buggy/badrequest`).subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    })
  }

  get401Error = () => {
    this.http.get(`${this.baseUrl}buggy/unauthorized`).subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    })
  }

  get500Error = () => {
    this.http.get(`${this.baseUrl}buggy/servererror`).subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    })
  }

  get400ValidationError = () => {
    this.http.post(`${this.baseUrl}buggy/validationerror`,{}).subscribe({
      next: response => console.log(response),
      error: err => this.validationErrors = err
    })
  }
}
