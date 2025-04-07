import i18next from 'i18next';

export const passwordChecks = [
  { label: i18next.t('passwordStrengthInput:password-lowercase'), re: '[a-z]' },
  { label: i18next.t('passwordStrengthInput:password-uppercase'), re: '[A-Z]' },
  {
    label: i18next.t('passwordStrengthInput:password-number-symbol'),
    re: "[0-9]|[$&+,:;=?@#|'<>.^*()%!-]",
  },
  { label: i18next.t('passwordStrengthInput:password-length'), re: '.{8,}' },
];

export function getPasswordStrengthError(value: string): string | null {
  if (passwordChecks.some((check) => !new RegExp(check.re).test(value))) {
    return i18next.t('passwordStrengthInput:invalid-password');
  }

  return null;
}

export function getStrength(password: string) {
  let multiplier = 0;
  passwordChecks.forEach((rule) => {
    if (!new RegExp(rule.re).test(password)) multiplier += 1;
  });
  return Math.max(100 - (100 / (passwordChecks.length + 1)) * multiplier, 10);
}
