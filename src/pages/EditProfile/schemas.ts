import i18next from 'i18next';

const ns = 'editProfile';

export const getUsernameError = (value: string): string | null => {
  if (value.length < 5 || value.length > 24) {
    return i18next.t(`${ns}:username-length-error`);
  }

  return null;
};

export const getGithubError = (value: string, isDisplay: boolean): string | null => {
  if (isDisplay && value === '') {
    return i18next.t(`${ns}:github-empty-error`);
  }

  if (value.length > 39) {
    return i18next.t(`${ns}:github-length-error`);
  }

  return null;
};
