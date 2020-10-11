export function json2array(json){
    let arr = [];
    if (json.length !== undefined) {
        for (let row in json) {
            json[row].key = row;
            arr.push(json[row]);
        }
    }else {
        json.key = 0;
        arr.push(json);
    }

    return arr;
}