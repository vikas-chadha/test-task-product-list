import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'product-list';
  currentItem: any = [];
  valueChange: boolean = true;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://fakestoreapi.com/products').subscribe(
      (res) => {
        this.currentItem = res;
        console.log(res);
      },
      (err) => {
        console.log('error');
        console.log(err);
      },
      () => {
        console.log('Completed');
      }
    );
  }
}
