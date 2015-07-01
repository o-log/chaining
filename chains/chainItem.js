/**
 * Один показ страницы в цепочке.
 */
function ChainItem(){
    this.piwik_url = 'none';
    this.piwik_ref = 'none';
    this.piwik_last_action = 'none'; // действие, которое привело к этому показу страницы
    this.piwik_duid = 'none'; // псевдоуникальный идентификатор этого показа
    this.ts = 0;
    this.dt = '';
    //this.piwik_delay = 0; // сколько секунд прошло между этим показом страницы и предыдущим в цепочке
    this.group = 'none';
    this.origin = 'none';
}

/**
 *
 * @param {chainingLogRecord} clr_obj
 */
ChainItem.prototype.fillFromChainingLogRecord = function(clr_obj){
    this.piwik_url = clr_obj.piwik_url;
    this.piwik_ref = clr_obj.piwik_ref;
    this.piwik_last_action = clr_obj.piwik_last_action;
    this.piwik_duid = clr_obj.piwik_duid;
    this.ts = clr_obj.ts;
    this.dt = clr_obj.dt;
    this.group = clr_obj.page_type + "_" + clr_obj.main_rubric;
};

module.exports = ChainItem;
