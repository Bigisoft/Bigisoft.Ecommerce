import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGetComponent } from './product-get.component';

describe('GetProductComponent', () => {
  let component: ProductGetComponent;
  let fixture: ComponentFixture<ProductGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductGetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
