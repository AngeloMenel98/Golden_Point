const generateCode = (length: number) => {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const characterLength = characters.length;
    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characterLength)
        );
    }
    const timestamp = new Date().getTime();

    result += timestamp.toString();

    return result;
};

export { generateCode };
