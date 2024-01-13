import bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const hashValue = (value: string) => bcrypt.hashSync(value, SALT_ROUNDS);

const compareHash = (value: string | Buffer, hash: string) =>
    bcrypt.compareSync(value, hash);

export { hashValue, compareHash };
