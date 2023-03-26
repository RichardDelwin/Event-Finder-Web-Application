import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmapsModelComponent } from './gmaps-model.component';

describe('GmapsModelComponent', () => {
  let component: GmapsModelComponent;
  let fixture: ComponentFixture<GmapsModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmapsModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GmapsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
