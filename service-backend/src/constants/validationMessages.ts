const validationMessages = {
    VALUE_IS_REQUIRED: (value: any) => `${value} is required.`,
    VALUE_IS_TYPE: (value: any, type: any) => `${value} should be ${type}`,
    PASSWORD_LENGTH_RESTRICTION: (length: any) =>
        `Password length must be at least ${length} chars long`,
    MAX_VALUE_RESTRICTION: (max: any) =>
        `The value must be between 0 and ${max}`,
};

export default validationMessages;
