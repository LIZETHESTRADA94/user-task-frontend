import { PublicClientApplication, LogLevel } from '@azure/msal-browser';

const AZURE_TENANT_NAME = import.meta.env.VITE_AZURE_TENANT_NAME;
const AZURE_CLIENT_ID = import.meta.env.VITE_AZURE_CLIENT_ID;
const AZURE_POLICY_NAME = import.meta.env.VITE_AZURE_POLICY_NAME;

// Configuración de Azure B2C
export const b2cPolicies = {
  names: {
    signUpSignIn: AZURE_POLICY_NAME
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${AZURE_TENANT_NAME}.b2clogin.com/${AZURE_TENANT_NAME}.onmicrosoft.com/${AZURE_POLICY_NAME}`,
    }
  },
  authorityDomain: `${AZURE_TENANT_NAME}.b2clogin.com`
};

export const msalConfig = {
  auth: {
    clientId: AZURE_CLIENT_ID, 
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: "/",
    postLogoutRedirectUri: "/"
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      }
    }
  }
};

export const loginRequest = {
  scopes: ['openid', 'profile'],
};

export const tokenRequest = {
  scopes: ['https://graph.microsoft.com/User.Read'],
  forceRefresh: false,
};

export const msalInstance = new PublicClientApplication(msalConfig);
