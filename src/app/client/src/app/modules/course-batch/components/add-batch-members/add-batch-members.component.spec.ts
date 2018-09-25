
import {throwError as observableThrowError, of as observableOf,  Observable } from 'rxjs';
import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
// Modules
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SuiModule } from 'ng2-semantic-ui';
import { SharedModule, ConfigService, ResourceService, ToasterService } from '@sunbird/shared';
// Services
import {} from './../../services';
import { UserService , SearchService} from '@sunbird/core';
import {CoreModule} from '@sunbird/core';
import {CourseBatchService} from '../../services';
import { TelemetryModule } from '@sunbird/telemetry';
import { AddBatchMembersComponent } from './add-batch-members.component';
import * as mockData from './add-batch-memebers.component.spec.data';
const testData = mockData.mockRes;
describe('AddBatchMembersComponent', () => {
  let component: AddBatchMembersComponent;
  let fixture: ComponentFixture<AddBatchMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBatchMembersComponent ],
      imports: [RouterTestingModule,
        FormsModule, HttpClientModule, SuiModule, SharedModule.forRoot(), CoreModule.forRoot(), TelemetryModule.forRoot()],
      providers: [SearchService, CourseBatchService, ToasterService, ResourceService, UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBatchMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should initialize the component expected calls for getSubOrgDetails ', inject([SearchService, UserService],
    (searchService, userService) => {
      userService._userData$.next({ err: null, userProfile: testData.userMockData });
      spyOn(searchService, 'getSubOrganisationDetails').and.callFake(() => observableOf(testData.orgDetailsSuccess));
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.subOrganizations.length).toBeGreaterThanOrEqual(8);
      expect(component.selectedUserList.length).toBeLessThanOrEqual(0);
  }));
  it('should call the fetchMembersDetails method and set the value of mentorList and participantList  ',
    inject([CourseBatchService, UserService],
    (courseBatchService, userService) => {
      userService._userData$.next({ err: null, userProfile: testData.userMockData });
      component.selectedOrg = ['01232004891662745660'];
      spyOn(courseBatchService, 'getUserList').and.callFake(() => observableOf(testData.getUserList));
      component.fetchMembersDetails('event');
      expect(component.mentorList.length).toBeGreaterThanOrEqual(1);
      expect(component.participantList.length).toBeGreaterThanOrEqual(3);
  }));
  it('should call the selectMentor method and set the value of selectedUserList ',
  inject([CourseBatchService, UserService],
    (courseBatchService, userService) => {
      const mentor = {
        avatar: null,
        email: 'us********@testss.com',
        id: '7e51e59e-5aca-410f-933e-851a35437c7e',
        name: 'Mentor Second User',
        phone: '******7418'
      };
      component.selectMentor(mentor);
      expect(component.selectedMentorList.length).toBeLessThanOrEqual(1);
      expect(component.selectedUserList.length).toBeLessThanOrEqual(1);
  }));
});
