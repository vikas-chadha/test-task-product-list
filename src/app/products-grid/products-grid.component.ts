import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../app.service';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
})
export class ProductsGridComponent implements OnInit {
  @Input() items: any;
  @Input() filter: any;
  dunebookList: any;

  constructor(private http: HttpClient, private service: DataService) {}

  ngOnInit(): void {
    this.service.sharedMessage.subscribe((message) => {
      this.filter = message;
      if (this.filter.maxPrice == null) {
        this.dunebookList = this.items.filter(
          (row: any) => row.price >= this.filter.minPrice
        );
      } else {
        this.dunebookList = this.items.filter((row: any) => {
          if (this.filter.catagories.length == 0) {
            return (
              row.price >= this.filter.minPrice &&
              row.price <= this.filter.maxPrice
            );
          } else {
            return (
              row.price >= this.filter.minPrice &&
              row.price <= this.filter.maxPrice &&
              this.filter.catagories.findIndex(
                (data: any) => data == row.category
              ) >= 0
            );
          }
        });
      }
    });
  }
}
