import { get } from 'lodash';

class Config {
    constructor(_configs ) {
        this._configs = _configs ? _configs : require('./../configs');
        return this;
    }

    get(key) {
        return get(this._configs, key);
    }

    config(key) {
        return this.get(key);
    }
}

export default Config;