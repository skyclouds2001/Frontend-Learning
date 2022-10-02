// import axios from 'axios';

axios.get('https://www.yangxiangrui.xyz:9092/gift/admin/unexaminedQuestion/1').then((res) => {
    const list = res?.data?.data?.['questionList:'];
    list.forEach(v => {
        $('#i').append(`<div>${v.question}</div>`);
    });
});
