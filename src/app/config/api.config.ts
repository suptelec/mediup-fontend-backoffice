const isLocalhost = window.location.hostname === 'localhost';

export const apiConfig = {
  identityBaseUrl: isLocalhost
    ? '/identity'
    : 'https://medi-up-identity.onrender.com',
  backofficeBaseUrl: isLocalhost
    ? '/backoffice'
    : 'https://mediup-backend-backoffice.onrender.com',
};
