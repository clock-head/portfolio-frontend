export function buildFormDataPayload(authType, formData) {
  const payload = {};

  payload.email = formData.get('email');
  payload.password = formData.get('password');
  payload.confirmPassword =
    authType === 'Sign Up' ? formData.get('confirm-password') : '';
  payload.firstName = authType === 'Sign Up' ? formData.get('first-name') : '';
  payload.lastName = authType === 'Sign Up' ? formData.get('last-name') : '';
  payload.role = authType === 'Sign Up' ? formData.get('role') : '';
  payload.acquisitionChannel =
    authType === 'Sign Up' ? formData.getAll('acquisition') : [];

  return payload;
}

export function setTokenExpiryDate() {}
