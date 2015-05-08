/**
 *
 * @param obj accessLogRecord
 * @returns {null}
 */
function createObjFromAccessLogRecordObj(obj){

    var re = /^POST \/sbtracking\/pageview2\?(.+) HTTP\//;

    //console.log(obj);

    var matches = obj.url.match(re);

    if (matches === null){
        console.log('not pageview2');
        return null;
    }

    var query = matches[1];

    var res = {};

    var url_parts_arr = query.split('&');
    //console.log(url_parts_arr );

    url_parts_arr.forEach(function(item, i, arr){
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
                    res.piwik_url = decodeURIComponent(value);
                    break;

                case 'urlref':
                    res.piwik_ref = decodeURIComponent(value);
                    break;

                case 'uuid':
                    res.piwik_unique_user = decodeURIComponent(value); // TODO: decode not needed?
                    break;

                case 'last_action':
                    res.piwik_last_action = decodeURIComponent(value); // TODO: decode not needed?
                    break;

                case 'duid':
                    res.piwik_duid = decodeURIComponent(value); // TODO: decode not needed?
                    break;

                case'last_duid':
                    res.piwik_last_duid = decodeURIComponent(value); // TODO: decode not needed?
                    break;
            }
        }
    });

    console.log(res);

    return res;
}

exports.createObjFromAccessLogRecordObj = createObjFromAccessLogRecordObj;