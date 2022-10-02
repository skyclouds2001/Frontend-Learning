
let timer = null;
var cache = {};

window.onload = function () {
    $('#s').hide();

    $('#i').on('keyup', function () {
        const kw = $(this).val().trim();
        if(kw.length <= 0) {
            return $('#s').hide();
        } else {
            if(timer) {
                clearTimeout(timer);
            }
            debounce(kw);
        }
    });
};

function getSuggestList (kw) {
    $.ajax({
        url: 'https://suggest.taobao.com/sug?q=' + kw,
        dataType: 'jsonp',
        success: function (res) {
            renderSuggestList(res);
        }
    });
}

function renderSuggestList (res) {
    if(res.result.length <= 0) {
        return $('#s').empty().hide();
    }
    $('#s').html(res.result.reduce((pre, cur) => pre += `<div class='search-suggest-item'>${cur[0]}</div>`)).show();
    cache[$('#i').val().trim()] = res.result;
}

function debounce (kw) {
    timer = setTimeout(() => {
        if(cache[$('#i').val().trim()])
            $('#s').html(cache[$('#i').val().trim()].reduce((pre, cur) => pre += `<div class='search-suggest-item'>${cur[0]}</div>`)).show();
        else
            getSuggestList(kw);
    });
}
