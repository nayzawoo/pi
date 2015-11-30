import _ from 'lodash';

class Config {
    constructor(_configs ) {
        this._configs = _configs ? _configs : require('./../configs');
        return this;
    }

    get(key) {
        return _.get(this._configs, key);
    }

    config(key) {
        return this.get(key);
    }
}

export default Config;