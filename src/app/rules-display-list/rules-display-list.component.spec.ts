import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesDisplayListComponent } from './rules-display-list.component';

describe('RulesDisplayListComponent', () => {
  let component: RulesDisplayListComponent;
  let fixture: ComponentFixture<RulesDisplayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesDisplayListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulesDisplayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
