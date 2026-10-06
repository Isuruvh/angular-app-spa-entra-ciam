import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { InteractionStatus, InteractionType } from '@azure/msal-browser';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule
      ],
      declarations: [ HomeComponent ],
      providers: [
        {
          provide: MSAL_GUARD_CONFIG,
          useValue: { interactionType: InteractionType.Redirect } as MsalGuardConfiguration
        },
        {
          provide: MsalService,
          useValue: {
            instance: {
              getAllAccounts: () => [],
              getActiveAccount: () => null
            }
          }
        },
        {
          provide: MsalBroadcastService,
          useValue: {
            inProgress$: of(InteractionStatus.None)
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
