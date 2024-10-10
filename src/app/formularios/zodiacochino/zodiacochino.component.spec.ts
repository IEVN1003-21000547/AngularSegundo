import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZodiacochinoComponent } from './zodiacochino.component';

describe('ZodiacochinoComponent', () => {
  let component: ZodiacochinoComponent;
  let fixture: ComponentFixture<ZodiacochinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZodiacochinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZodiacochinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
