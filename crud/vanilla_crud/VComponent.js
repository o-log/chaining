"use strict";

class VComponent {
    constructor() {
        // TODO: уйти от глобальной переменной?
        if (!window._jhfbvkjsdbvjhksfv){
            window._jhfbvkjsdbvjhksfv = 0;
        }

        this._id = window._jhfbvkjsdbvjhksfv++; // atomic
    }

    getElementByLocalId(id) {
        var local_id = this.localElementId(id);
        return document.getElementById(local_id);
    }

    localElementId(id) {
        return 'a' + this._id + '__' + id;
    }
}
