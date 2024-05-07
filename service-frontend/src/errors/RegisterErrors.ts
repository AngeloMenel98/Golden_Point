export interface RegisterFieldErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  location?: string;

  general?: string;
}

export const RegisterErrors = {
  usernameRequired: "Nombre de Usuario es obligatorio",
  passwordRequired: "Contraseña es obligatorio",
  passwordMinLength: "La contraseña debe ser de al menos 8 caracteres",
  emailRequired: "Email es obligatorio",
  firstNameRequired: "Nombre es obligatorio",
  lastNameRequired: "Apellido es obligatorio",
  phoneNumberRequired: "Número de Teléfono es obligatorio",
  locationRequired: "Ciudad es obligatorio",
};

export const errorMappings: { [key: string]: keyof RegisterFieldErrors } = {
  [RegisterErrors.usernameRequired]: "username",
  [RegisterErrors.passwordRequired]: "password",
  [RegisterErrors.passwordMinLength]: "password",
  [RegisterErrors.emailRequired]: "email",
  [RegisterErrors.firstNameRequired]: "firstName",
  [RegisterErrors.lastNameRequired]: "lastName",
  [RegisterErrors.phoneNumberRequired]: "phoneNumber",
  [RegisterErrors.locationRequired]: "location",
};
