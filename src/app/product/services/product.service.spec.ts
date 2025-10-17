import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { environment } from 'src/environments/environment.prod';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch products', () => {
    service.searchProducto().subscribe((products) => {
      expect(products.length).toBe(2);
    });

    const req = httpMock.expectOne(`${environment.apiEcommerce}/products`);
    req.flush([{ id: 1 }, { id: 2 }]);
  });
});
