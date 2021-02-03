import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostsUploadComponent } from './hosts-upload.component';

describe('HostsUploadComponent', () => {
  let component: HostsUploadComponent;
  let fixture: ComponentFixture<HostsUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostsUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
