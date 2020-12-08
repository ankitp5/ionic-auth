import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { AuthConfig } from 'angular-oauth2-oidc';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  authConfig: AuthConfig = {
    issuer: 'https://idfed-preprod.mpsa.com:443/as/authorization.oauth2', // notworking
    // issuer: 'https://dev-7860933.okta.com/oauth2/default', // working

    redirectUri: 'com.mpsa.dev.configurator://dealer_auth/callback', // this need be make same on server also 

    clientId: 'PGUQOEDSNKUTDZYIGJJZFFJWIXNDGKNN', // not working
    // clientId: '0oa1dg092ZP74sSL05d6', // working
    
    responseType: 'id_token',
    scope: 'openid profile email',
  }
  constructor(
    private oauthService: OAuthService,
  ) { 


  }

  ngOnInit() {
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.initCodeFlow();
    this.oauthService.configure(this.authConfig);
    this.oauthService.initLoginFlow();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

}
