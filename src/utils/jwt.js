import jwt from 'jsonwebtoken';
import {config} from '../config/env.js';

export const aToken = (payLoad) => {
    return jwt.sign(payLoad, config.asecret, {expiresIn: '59m'});
};

export const refToken = (payLoad) => {
    return jwt.sign(payLoad, config.rsecret, {expiresIn: '30d'});
};
