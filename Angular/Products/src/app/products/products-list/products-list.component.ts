import {Component, OnInit} from '@angular/core';
import {IProduct} from '../Product';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  pageTitle = 'Product List';
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  imageWidth = 50;
  imageMargin = 2;
  showImage: boolean;
  private errorMessage: any;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  constructor(private productsService: ProductsService) {
    this.showImage = false;
  }

  ngOnInit(): void {
    console.log('OnInit Component List Products');
    this.productsService.getProducts().subscribe(
      {next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
        error: err => this.errorMessage = err
      });
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  onClickStarInfo(message: string) {
    console.log(message + ' received');
  }

  onClickStarAdd(product: IProduct) {
    const index = this.products.indexOf(product);
    this.products[index].starRating++;
    if (this.products[index].starRating > 5) {
      this.products[index].starRating = 5;
    }
  }

  private performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }




}
