import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBasicSettingComponent } from './test-basic-setting.component';

describe('TestBasicSettingComponent', () => {
  let component: TestBasicSettingComponent;
  let fixture: ComponentFixture<TestBasicSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestBasicSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestBasicSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
