var context = require("./context");
var Chain = require("./chain");

/**
 * Один показ страницы в цепочке.
 */
function ChainItem(){
    this.piwik_url = 'none';
    this.piwik_ref = 'none';
    this.piwik_last_action = 'none'; // действие, которое привело к этому показу страницы
    this.piwik_duid = 'none'; // псевдоуникальный идентификатор этого показа
    this.ts = 0;
    this.piwik_delay = 0; // сколько секунд прошло между этим показом страницы и предыдущим в цепочке
}

function chainingLogRecord(){
    this.piwik_url = '1';
    this.piwik_ref = '2';
    this.piwik_unique_user = '3';
    this.piwik_last_action = '4';
    this.piwik_duid = '5';
    this.piwik_last_duid = '6';
}

chainingLogRecord.prototype.chain = function(){
    // создаем новый элемент истории пользователя
    var new_chain_item_obj = new ChainItem();
    new_chain_item_obj.piwik_url = this.piwik_url;
    new_chain_item_obj.piwik_ref = this.piwik_ref;
    new_chain_item_obj.piwik_last_action = this.piwik_last_action;
    new_chain_item_obj.ts = this.ts;
    new_chain_item_obj.piwik_duid = this.piwik_duid;

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

        var direct = false;
        if (this.piwik_ref == ''){
            direct = true;
        }

        var yandex = false;
        var google = false;

        // создаем цепочки только для первых входов (по рефереру)
        // дополнительно проверять last_duid? это может повтор показа страницы входа из истории
        if (direct || yandex || google) {
            var chain_obj = new Chain();
            chain_obj.user_agent = this.user_agent;
            chain_obj.addItem(new_chain_item_obj);
            context.setChainByKey(puuid, chain_obj);
        }

        return true;
    }

    // проверяем, был ли предыдущий показ страницы из истории действительно предыдущим для текущего показа страницы (совпадение duid)

    var last_chain_element = chain_obj.getLastItem();
    //\Sportbox\Helpers::assert($last_chain_element);
    if (!last_chain_element){throw "";}

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
            console.log("FAIL3"); // пока просто логируем, потом разобраться
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

}

/**
 * заполняет объект данными из объекта записи аксесс лога, возвращает true если успешно
 * @param {accessLogRecord} accessLogRecord_obj
 * @returns {null}
 */
chainingLogRecord.prototype.fillFromAccessLogRecordObj = function(accessLogRecord_obj){
    var re = /^POST \/sbtracking\/pageview2\?(.+) HTTP\//;

    //console.log(accessLogRecord_obj);

    var matches = accessLogRecord_obj.url.match(re);

    if (matches === null){
        console.log('not pageview2');
        return false;
    }

    var query = matches[1];

    //var res = {};

    var url_parts_arr = query.split('&');
    //console.log(url_parts_arr );

    //url_parts_arr.forEach(function(item, i, arr){
    for (var i = 0; i < url_parts_arr.length; i++){
        var item = url_parts_arr[i];
        //console.log(item);
        if (item.indexOf('=') != -1){
            //console.log(item);
            var item_parts_arr = item.split('=');
            var key = item_parts_arr[0];
            var value = item_parts_arr[1];

            //console.log(key);
            //console.log(value);

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
            }
        }
    };

    //console.log(this);

    return true;
}

module.exports = chainingLogRecord;