import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {RootObject , IProduct} from '../products/DataInput';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productUrl = 'http://localhost:8080/product?page=0&size=400';
  // private productUrl = 'aaa/data.json';

  constructor(private httpClient: HttpClient) {
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.productId === id))
      );
  }

  // json from java spring rest repository at adders http://localhost:8080/product
  // json rootobject
  getProducts(): Observable<IProduct[]> {
    console.log('get from json spring');
    const rootObjectObservable =  this.httpClient.get<RootObject>(this.productUrl).pipe(
      tap(data => console.log('Received data from ' + this.productUrl + JSON.stringify(data))),
      catchError(this.handleError)
    );
    return  rootObjectObservable.pipe(
      map((rootObject: RootObject) => {
        rootObject._embedded.product.map((product: IProduct) => product.productId = Number(product._links.product.href.split('/').pop()) );
        console.log(rootObject._embedded.product);
        return rootObject._embedded.product;
      }));
  }

  // json IProduct Format
  // getProducts(): Observable<IProduct[]> {
  //   console.log('get from json ');
  //   return this.httpClient.get<IProduct[]>(this.productUrl).pipe(
  //     tap(data => console.log('Received data from ' + this.productUrl + JSON.stringify(data))),
  //     catchError(this.handleError)
  //   );
  // }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server return code ${err.status} Error occurred: ${err.message}`;
    }
    console.log('Some Error with data from ' + this.productUrl);
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  // getProducts(): IProduct[] {
  //   return [
  //     {
  //       productId: 1,
  //       productName: 'Leaf Rake',
  //       productCode: 'GDN-0011',
  //       releaseDate: 'March 19, 2019',
  //       description: 'Leaf rake with 48-inch wooden handle.',
  //       price: 19.95,
  //       starRating: 3.2,
  //       imageUrl: 'assets/images/leaf_rake.png'
  //     },
  //     {
  //       productId: 2,
  //       productName: 'Garden Cart',
  //       productCode: 'GDN-0023',
  //       releaseDate: 'March 18, 2019',
  //       description: '15 gallon capacity rolling garden cart',
  //       price: 32.99,
  //       starRating: 4.2,
  //       imageUrl: 'assets/images/garden_cart.png'
  //     },
  //     {
  //       productId: 5,
  //       productName: 'Hammer',
  //       productCode: 'TBX-0048',
  //       releaseDate: 'May 21, 2019',
  //       description: 'Curved claw steel hammer',
  //       price: 8.9,
  //       starRating: 4.8,
  //       imageUrl: 'assets/images/hammer.png'
  //     },
  //     {
  //       productId: 8,
  //       productName: 'Saw',
  //       productCode: 'TBX-0022',
  //       releaseDate: 'May 15, 2019',
  //       description: '15-inch steel blade hand saw',
  //       price: 11.55,
  //       starRating: 3.7,
  //       imageUrl: 'assets/images/saw.png'
  //     },
  //     {
  //       productId: 10,
  //       productName: 'Video Game Controller',
  //       productCode: 'GMG-0042',
  //       releaseDate: 'October 15, 2018',
  //       description: 'Standard two-button video game controller',
  //       price: 35.95,
  //       starRating: 4.6,
  //       imageUrl: 'assets/images/xbox-controller.png'
  //     }
  //   ];
  // }


}
