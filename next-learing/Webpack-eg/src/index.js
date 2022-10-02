import $ from 'jquery';
import '@/css/index.css';
import '@/css/index.less';
import logo from '@/images/icon.png';

import msg from '@/msg.js';

import fsg from '@/msg.ts';

$('#img').attr('src', logo);

$(function () {
  $('li:odd').css('background-color', 'red');
  $('li:even').css('background-color', 'pink');
});

console.log(msg, fsg);

// function B (target) {
//   target.c = 't';
// }

// @B
// class A {};

// console.log(A.c);
