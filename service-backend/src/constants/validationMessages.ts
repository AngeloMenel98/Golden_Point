const valMessage = {
  VALUE_IS_REQUIRED: (value: any) => `${value} es obligatorio.`,
  VALUE_IS_TYPE: (value: any, type: any) => `${value} debe ser un ${type}`,
  PASSWORD_LENGTH_RESTRICTION: (length: any) =>
    `La contraseña debe ser de al menos ${length} caracteres`,
  MAX_VALUE_RESTRICTION: (max: any) => `El valor debe ser entre 0 y ${max}`,
  VALUE_NOT_EXIST: (value: any) => `${value} no existe.`,
  VALUE_INCORRECT: (value: any) => `${value} es incorrecta.`,
};

export default valMessage;
