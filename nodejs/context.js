var _chains = {};

function getChainByKey(key){
    if (key in _chains){
        return _chains[key];
    }

    return null;
}

/**
 *
 * @param {Chain} key
 * @param chain_obj
 */
function setChainByKey(key, chain_obj){
    _chains[key] = chain_obj;

    chain_obj.storeToElastic(key);
}

exports.getChainByKey = getChainByKey;
exports.setChainByKey = setChainByKey;