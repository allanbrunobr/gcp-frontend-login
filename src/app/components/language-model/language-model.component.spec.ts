import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageModelComponent } from './language-model.component';

describe('LanguageModelComponent', () => {
  let component: LanguageModelComponent;
  let fixture: ComponentFixture<LanguageModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LanguageModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
