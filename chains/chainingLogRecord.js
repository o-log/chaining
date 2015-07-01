var context = require("./context");
var Chain = require("./chain");
var ChainItem = require("./chainItem");

function chainingLogRecord(){
    this.piwik_url = '1';
    this.piwik_ref = '2';
    this.piwik_unique_user = '3';
    this.piwik_last_action = '4';
    this.piwik_duid = '5';
    this.piwik_last_duid = '6';
    this.page_type = 'none';
    this.main_rubric = 'none';
}

var yandex_re = /yandex/;
var google_re = /google/;
var new_chain_item_obj; // optimization

chainingLogRecord.prototype.chain = function(){
    // создаем из текущей записи лога новый элемент истории пользователя
    new_chain_item_obj = new ChainItem();
    new_chain_item_obj.fillFromChainingLogRecord(this);

    // получаем существующую историю этого пользователя если есть
    var puuid = this.piwik_unique_user;
    var chain_obj = context.getChainByKey(puuid);

    if (chain_obj === null) {
        // если истории нет - в текущее событие ничего не записываем, сохраняем его в истории пользователя

        /* TODO
        $direct = ($this->piwik_ref == '');
        $yandex = (preg_match('@yandex@', $this->piwik_ref));
        $google = (preg_match('@google@', $this->piwik_ref));
        */

        //console.log(this.piwik_ref);

        var direct = false;
        if (this.piwik_ref == ''){
            direct = true;
            new_chain_item_obj.origin = 'direct';
        }

        var yandex = false;
        var google = false;

        var yandex_matches = this.piwik_ref.match(yandex_re);
        if (yandex_matches !== null) {
            new_chain_item_obj.origin = 'yandex';
            yandex = true;
        }

        var google_matches = this.piwik_ref.match(google_re);
        if (google_matches !== null) {
            new_chain_item_obj.origin = 'google';
            google = true;
        }

        // создаем цепочки только для первых входов (по рефереру)
        // дополнительно проверять last_duid? это может повтор показа страницы входа из истории
        if (direct || yandex || google || true) { // пока создаем цепочки без источника - для отладки
            var chain_obj = new Chain();
            chain_obj.user_agent = this.user_agent;
            chain_obj.addItem(new_chain_item_obj);
            context.setChainByKey(puuid, chain_obj);
        } else {
            console.log('FAIL 4');
        }

        return true;
    }

    //console.log('has chain');

    // проверяем, был ли предыдущий показ страницы из истории действительно предыдущим для текущего показа страницы (совпадение duid)

    var last_chain_element = chain_obj.getLastItem();
    //\Sportbox\Helpers::assert($last_chain_element);
    if (!last_chain_element){
        throw "";
    }

    if (this.piwik_last_duid != last_chain_element.piwik_duid) {

        /*
         $chain_obj = new \Sportbox\AccessLog\Chain();
         $chain_obj->addItem($new_chain_item_obj);
         self::setChainForPUUID($this->piwik_unique_user, $chain_obj);
         */

        return true;
    }

    // грубая проверка на повтор из истории
    if (this.piwik_ref != last_chain_element.piwik_url) {
        // у повтора из истории последний экшен должен быть init, потому что пользователь никуда не кликал
        if (this.piwik_last_action == 'init'){
            this.piwik_last_action = 'history_navigation';
            new_chain_item_obj.piwik_last_action = this.piwik_last_action;
        } else {
            //console.log("FAIL 3"); // пока просто логируем, потом разобраться
        }
    }

    // считаем, сколько времени прошло с предыдущего показа

    var last_ts = last_chain_element.ts;
    new_chain_item_obj.piwik_delay = (new_chain_item_obj.ts - last_ts);

    // заполняем поля текущей записи предыдущими событиями из цепочки

    /*
     $chain_arr = $chain_obj->items_arr;
     $chain_rev_arr = array_reverse($chain_arr);
     $index = 0;
     foreach ($chain_rev_arr as $item_obj) {
     if ($index < 5) {
     $param_name = 'url_' . $index;
     $this->$param_name = $item_obj->piwik_url;
     }

     $index++;
     }
     */

    // дописываем новое событие в цепочку

    chain_obj.addItem(new_chain_item_obj);
    context.setChainByKey(puuid, chain_obj);

    return true;

};

/**
 * заполняет объект данными из объекта записи аксесс лога, возвращает true если успешно
 * @param {accessLogRecord} accessLogRecord_obj
 * @returns {boolean}
 */
chainingLogRecord.prototype.fillFromAccessLogRecordObj = function(accessLogRecord_obj){

    this.ts = accessLogRecord_obj.ts;
    this.dt = accessLogRecord_obj.dt;

    var re = /^POST \/sbtracking\/pageview2\?(.+) HTTP\//;

    var matches = accessLogRecord_obj.url.match(re);

    if (matches === null){
        return false;
    }

    var query = matches[1];
    var url_parts_arr = query.split('&');

    for (var i = 0; i < url_parts_arr.length; i++){
        var item = url_parts_arr[i];
        if (item.indexOf('=') != -1){
            var item_parts_arr = item.split('=');
            var key = item_parts_arr[0];
            var value = item_parts_arr[1];

            switch (key) {
                case 'url':
                    this.piwik_url = decodeURIComponent(value);
                    break;

                case 'urlref':
                    this.piwik_ref = decodeURIComponent(value);
                    break;

                case 'uuid':
                    this.piwik_unique_user = value; // TODO: decode not needed?
                    break;

                case 'last_action':
                    this.piwik_last_action = value; // TODO: decode not needed?
                    break;

                case 'duid':
                    this.piwik_duid = value; // TODO: decode not needed?
                    break;

                case'last_duid':
                    this.piwik_last_duid = value; // TODO: decode not needed?
                    break;

                case'main_rubric':
                    this.main_rubric = value; // TODO: decode not needed?
                    break;

                case'page_type':
                    this.page_type = value; // TODO: decode not needed?
                    break;
            }
        }
    }

    return true;
};

module.exports = chainingLogRecord;