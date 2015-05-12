
function Chain() {
    //static $_buffer = array();

    //use \Sportbox\Util\ProtectProperties;

    this.user_agent = '';
    this.items_arr = [];
}

/**
 *
 * @returns {ChainItem}
 */
Chain.prototype.getLastItem = function(){
        if (this.items_arr.length == 0){
            return null;
        }

        var last_item_index = this.items_arr.length - 1;
        return this.getItemByIndex(last_item_index);
    };

Chain.prototype.getItemByIndex = function(index){
        if (this.items_arr[index] === undefined) {
            return null;
        }

    return this.items_arr[index];
};

Chain.prototype.addItem = function(item_obj){
        this.items_arr.push(item_obj);
};

var bulk = [];

var elasticsearch = require('elasticsearch');

var el_client = new elasticsearch.Client({
    host: 'localhost:9200'
});

Chain.prototype.storeToElastic = function(puuid){

    var body = {};
    body.data = 1;

    /*
     var task = {
     index: 'nodejs',
     type: 'nodejs',
     //id: '1',
     body: body
     };
     ;
     el_client.create(task);
     */

    var task = { index:  {
        _index: 'nodejs_chains',
        _type: 'nodejs_chains'
    }};

    bulk.push(task);
    bulk.push(body);

    if (bulk.length == 200){
        el_client.bulk({
            body: bulk
        });

        bulk = [];
    }

    /*
        $body = array();
        $chain_first_item = $this->getItemByIndex(0);

        $body['dt'] = date('c', $chain_first_item->ts);
        $body['platform'] = \Sportbox\AccessLog\Helper::userAgentToPlatform($this->user_agent);


        $body['ref_as_term'] = 'none';
        if ($chain_first_item->piwik_ref != '') {
            if (preg_match('@yandex@', $chain_first_item->piwik_ref)){
                $body['ref_as_term'] = \Sportbox\AccessLog\Helper::el_term('yandex');
            } elseif (preg_match('@google@', $chain_first_item->piwik_ref)){
                $body['ref_as_term'] = \Sportbox\AccessLog\Helper::el_term('google');
            } else {
                $body['ref_as_term'] = \Sportbox\AccessLog\Helper::el_term($chain_first_item->piwik_ref);
            }
        }

        for ($i = 0; $i < 5; $i++) {
            $url = 'none';
            //$goal = 'none';
            $last_action = 'none';
            $delay = 0;

            $chain_item = $this->getItemByIndex($i);

            if ($chain_item) {
                $url = $chain_item->piwik_url;
                //$goal = $chain_item->piwik_goal;
                if ($chain_item->piwik_last_action != '') {
                    $last_action = $chain_item->piwik_last_action;
                }
                $delay = $chain_item->piwik_delay;
            }

            $param_name = 'url_' . $i;
            $body[$param_name] = \Sportbox\AccessLog\Helper::el_term($url);

            $param_name = 'group_' . $i;
            $body[$param_name] = \Sportbox\AccessLog\Helper::urlToGroup($url);

            //$param_name = 'goal_' . $i;
            //$body[$param_name] = \Sportbox\AccessLog\PiwikLogRecord::el_term($goal);

            $param_name = 'last_action_' . $i;
            $body[$param_name] = \Sportbox\AccessLog\Helper::el_term($last_action);

            $param_name = 'delay_' . $i;
            $body[$param_name] = intval($delay);
        }

        $chain_id = $puuid . '_' . $chain_first_item->ts;

        $index_name = 'chains' . date('Ymd', $chain_first_item->ts);
        self::$_buffer[] = array("index" => array('_index' => $index_name, '_type' => 'a', '_id' => $chain_id));
        self::$_buffer[] = $body;

        if (count(self::$_buffer) > 100) {
            $params = array();
            $params['body'] = self::$_buffer;

            global $el_client_obj;
            $ret = $el_client_obj->bulk($params);
            self::$_buffer = array();
        }

    }
    */
}

module.exports = Chain;
