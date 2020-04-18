import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {IProduct} from '../Product';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit, OnChanges {
  starWidth: number ;
  @Input() rating: number;
  @Input() product: IProduct;
  @Output() ratingClickInfo: EventEmitter<string> = new EventEmitter<string>();
  @Output() ratingClick: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  cursor = 'pointer';

  ngOnChanges(): void {
    this.starWidth = this.rating * 75 / 5;
    if (this.rating === 5){
      this.cursor = 'default';
    }
  }

  ngOnInit(): void {
    console.log('OnInit Component Star' );
  }

  onClick() {
    console.log('The ' + this.rating + ' was clicked');
    this.ratingClickInfo.emit('The ' + this.rating + ' was clicked');
    this.ratingClick.emit(this.product);
  }
}
