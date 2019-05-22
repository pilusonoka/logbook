import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFlightComponent } from './new-flight.component';
import { FormsModule } from '@angular/forms';
import { HoursPipe } from '../hours.pipe';

describe('NewFlightComponent', () => {
  let component: NewFlightComponent;
  let fixture: ComponentFixture<NewFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFlightComponent, HoursPipe ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
