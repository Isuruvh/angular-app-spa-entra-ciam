import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { InteractionStatus, InteractionType } from '@azure/msal-browser';
import { EMPTY, of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        MatButtonModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: MSAL_GUARD_CONFIG,
          useValue: { interactionType: InteractionType.Redirect } as MsalGuardConfiguration
        },
        {
          provide: MsalService,
          useValue: {
            instance: {
              enableAccountStorageEvents: () => {},
              getAllAccounts: () => [],
              getActiveAccount: () => null
            }
          }
        },
        {
          provide: MsalBroadcastService,
          useValue: {
            inProgress$: of(InteractionStatus.None),
            msalSubject$: EMPTY
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Microsoft identity platform'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Microsoft identity platform');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain('Microsoft identity platform');
  });
});
