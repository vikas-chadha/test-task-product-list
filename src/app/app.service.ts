import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private message = new BehaviorSubject({
    catagories: [],
    minPrice: 0,
    maxPrice: null,
  });
  sharedMessage = this.message.asObservable();

  constructor() {}

  setFilter(message: any) {
    this.message.next(message);
  }
}
