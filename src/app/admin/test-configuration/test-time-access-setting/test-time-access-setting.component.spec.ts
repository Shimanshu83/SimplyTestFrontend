import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTimeAccessSettingComponent } from './test-time-access-setting.component';

describe('TestTimeAccessSettingComponent', () => {
  let component: TestTimeAccessSettingComponent;
  let fixture: ComponentFixture<TestTimeAccessSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTimeAccessSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTimeAccessSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
