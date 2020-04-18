import { Component, OnInit } from '@angular/core';
import {IProduct} from '../Product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit {
  pageTitle =  `Product Detail`;
  product: IProduct | undefined;
  private errorMessage: '';

  constructor(private route: ActivatedRoute, private router: Router, private productsService: ProductsService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += ` : ${id}`;
    this.getProduct(id);
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  private getProduct(id: number) {
    this.productsService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }
}
