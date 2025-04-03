export const getUsernameError = (value: string): string => {
  if (value.length < 5) {
    return 'Username must be more than 5 characters.';
  }

  return '';
};

export const getGithubError = (value: string, isDisplay: boolean): string => {
  if (isDisplay && value === '') {
    return 'GitHub username cannot be empty when display is enabled.';
  }

  return '';
};
