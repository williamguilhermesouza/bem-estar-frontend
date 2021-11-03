import bcrypt from 'bcryptjs';

export function encryptPassword(password) {
    let salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

export function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}