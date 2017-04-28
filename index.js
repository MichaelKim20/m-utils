
exports.cloneArray = function(source, target) {
    if (target == undefined) target = [];
    var srcItem, tagItem;
    for (var i = 0; i < source.length; i++) {
        srcItem = source[i];
        if (Array.isArray(srcItem)) {
            tagItem = exports.cloneArray(srcItem);
        } else {
            tagItem = exports.cloneObject(srcItem);
        }
        target.push(tagItem);
    }
    return target;
};

exports.cloneObject = function(source, target) {
    if (null == source || "object" != typeof source) return source;
    if (target == undefined) target = {};
    for (key in source) {
        if (source.hasOwnProperty(key)) {
            if (Array.isArray(source[key])) {
                target[key] = exports.cloneArray(source[key]);
            } else {
                target[key] = exports.cloneObject(source[key]);
            }
        }
    }
    return target;
};

exports.findInArray = function(source, field, value) {
    for (var i = 0; i < source.length; i++) {
        if (source[i][field] === undefined) continue;
        if (source[i][field] == value) {
            return i;
        }
    }
    return -1;
};

exports.sortArray = function(array, field, type) {
    if (type == 'asc') {
        array.sort(function(a, b) {
            if (a[field] > b[field]) {
                return 1;
            } else if (a[field] < b[field]) {
                return -1;
            } else {
                return 0;
            }
        })
    } else {
        array.sort(function(a, b) {
            if (a[field] > b[field]) {
                return -1;
            } else if (a[field] < b[field]) {
                return 1;
            } else {
                return 0;
            }
        })
    }
};


/**
 * @returns {string}
 */
exports.getUniqueId = function() {
    this.timestamp = (+new Date).toString();
    var parts = this.timestamp.split("").reverse();
    var id = "";
    var index;
    for (var i = 0; i < 8; ++i) {
        index = Math.floor(Math.random() * parts.length);
        id += parts[index];
    }
    return id;
};

exports.oformat = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};
