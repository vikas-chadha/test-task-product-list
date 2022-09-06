import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../app.service';

@Component({
  selector: 'app-side-pane',
  templateUrl: './side-pane.component.html',
  styleUrls: ['./side-pane.component.scss'],
})
export class SidePaneComponent implements OnInit {
  @Input() items: any;
  @Output() filterData = new EventEmitter<any>();
  minPrice: number = 0;
  maxPrice: any = null;
  filter: any = {
    catagories: [],
    minPrice: 0,
    maxPrice: 0,
  };
  filterCatagories: any = [];
  options: Options = {
    floor: 0,
    ceil: 200,
  };
  constructor(private service: DataService) {}
  ngOnInit(): void {
    if (this.items.length > 0) {
      // first product price as minimum price
      this.minPrice = this.items[0].price;
      // filter catagories from product list from API
      this.items.map((row: any) => {
        if (row.price < this.minPrice) {
          this.minPrice = row.price;
        }
        if (row.price > this.maxPrice) {
          this.maxPrice = row.price;
        }
        if (
          this.filterCatagories.findIndex(
            (catagory: any) => row.category == catagory
          ) < 0
        ) {
          this.filterCatagories.push(row.category);
        }
      });
      this.options.floor = this.minPrice;
      this.options.ceil = this.maxPrice;
    }
  }
  updateFilter(event: any, type: string = '', item: string = '') {
    this.filter.maxPrice = this.maxPrice;
    this.filter.minPrice = this.minPrice;
    if (type == '') {
      // if type event is slider 
      this.filter.maxPrice = event.highValue;
      this.filter.minPrice = event.value;
    } else {
      //if type of event is checkbox
      if (event.target.checked) {
        this.filter.catagories.push(item);
      } else {
        const index: number = this.filter.catagories.indexOf(item);
        if (index !== -1) {
          this.filter.catagories.splice(index, 1);
        }
      }
    }
    this.service.setFilter(this.filter);
  }
}
