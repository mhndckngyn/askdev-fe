import i18next from 'i18next';

const ns = 'welcome';

export function getEmailLoginError(value: string): string | null {
  const regex = /^\S+@\S+\.\S+$/;
  if (!regex.test(value)) {
    return i18next.t(`${ns}:invalid-email`);
  }

  return null;
}

export function getUsernameLoginError(value: string): string | null {
  if (value.length < 5 || value.length > 24) {
    return i18next.t(`${ns}:username-length`);
  }

  return null;
}

export function getConfirmPasswordError(value1: string, value2: string) {
  if (value1 !== value2) {
    return i18next.t(`${ns}:password-mismatch`);
  }

  return null;
}
