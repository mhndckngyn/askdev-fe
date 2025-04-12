export type SignupFormValues = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type SignupPayload = Omit<SignupFormValues, 'confirmPassword'>;

export type LoginFormValues = {
  email: string;
  password: string;
}
