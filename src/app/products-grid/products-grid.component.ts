import { Component, NgIterable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit {
  dunebookList :any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://fakestoreapi.com/products')
    .subscribe(res => 
      {
        this.dunebookList = res;
        console.log(res);
      }, err => {
        console.log('error');
        console.log(err);
      }, () => {
        console.log('Completed');
      });
  }

}
