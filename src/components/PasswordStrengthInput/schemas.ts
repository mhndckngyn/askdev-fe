import i18next from 'i18next';

const ns = 'passwordStrengthInput';

const passwordRequirements = {
  lowercase: 'password-lowercase',
  uppercase: 'password-uppercase',
  numberSymbol: 'password-number-symbol',
  length: 'password-length',
} as const;

type PasswordLabel =
  (typeof passwordRequirements)[keyof typeof passwordRequirements];

export const passwordChecks: { label: PasswordLabel; re: string }[] = [
  { label: 'password-lowercase', re: '[a-z]' },
  { label: 'password-uppercase', re: '[A-Z]' },
  {
    label: 'password-number-symbol',
    re: "[0-9]|[$&+,:;=?@#|'<>.^*()%!-]",
  },
  { label: 'password-length', re: '.{8,}' },
];

export function getPasswordStrengthError(value: string): string | null {
  if (passwordChecks.some((check) => !new RegExp(check.re).test(value))) {
    return i18next.t(`${ns}:invalid-password`);
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
