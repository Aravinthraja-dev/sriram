import { Provider } from '@angular/core';
import { SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';

export function provideSocialAuth(): Provider {
  return {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('894842052529-3ma142ube1dgg9d4ruk9o5kqg3e0ja3g.apps.googleusercontent.com', {
            oneTapEnabled: true,
            prompt_parent_id: 'google-signin-container'
          })
        }
      ]
    } as SocialAuthServiceConfig
  };
}