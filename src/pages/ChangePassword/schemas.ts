import i18next from 'i18next';

const ns = 'changePassword';

export function getCurrentPasswordError(value: string): string | null {
  if (value.length === 0) {
    return i18next.t(`${ns}:current-password-required`);
  }

  return null;
}

export function getCurrentAndNewPasswordError(
  value1: string,
  value2: string,
): string | null {
  if (value1 === value2) {
    return i18next.t(`${ns}:password-is-using`);
  }

  return null;
}

export function getConfirmPasswordError(
  value1: string,
  value2: string,
): string | null {
  if (value1 !== value2) {
    return i18next.t(`${ns}:password-mismatch`);
  }

  return null;
}
