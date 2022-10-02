const mysql = require('mysql');
const puppettor = require('puppeteer');
const fs = require('fs');
let httpurl = 'https://sobooks.cc/';
async function start() {
  let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zkh20020215',
    database: 'zhangsan',
  });
  con.connect();
  let browser = await puppettor.launch({ headless: false });
  let page = await browser.newPage();
  await page.goto(httpurl);
  let pagenum = await page.$eval('.pagination li:last-child span', element =>
    element.innerHTML.substring(1, element.innerHTML.length - 2).trim()
  );
  page.close();
  let list = await getpageinfo(2);
  list.forEach(e => {
    fs.writeFileSync('booklist.txt', `${e.href}\n`, { flag: 'a', encoding: 'utf-8' });
    fs.writeFileSync('booklist.txt', `${e.title}\n`, { flag: 'a', encoding: 'utf-8' });
  });
  console.log('list写入成功');
  let bookinfolist = [];
  for (let i = 0; i < list.length; i++) {
    let obj = await getbookinfo(list[i].href);
    bookinfolist.push(obj);
    let strsql7 = 'insert into booklist (name,author,format,tag,time) value(?,?,?,?,?)';
    con.query(strsql7, [obj.name, obj.author, obj.format, obj.tag, obj.time], (err, res, field) => {
      if (err) {
        console.log(err); // 打印报错
      } else {
        console.log('写入数据库'); // 查表的结果
      }
    });
  }
  async function getpageinfo(index) {
    let page = await browser.newPage();
    await page.goto(`https://sobooks.cc/page/${index}`);
    let list = await page.$$eval('.card .card-item .thumb-img>a', e => {
      let arr = [];
      e.forEach(element => {
        arr.push({
          href: element.getAttribute('href'),
          title: element.getAttribute('title'),
        });
      });
      return arr;
    });
    page.close();
    return list;
  }
  async function getbookinfo(url) {
    let page = await browser.newPage();
    await page.goto(url);
    let bookinfo = await page.$$eval('.bookinfo li', e => {
      let arr = [];
      e.forEach(item => {
        arr.push(item.innerText.substring(3));
      });
      console.log(arr);
      return {
        name: arr[0],
        author: arr[1],
        format: arr[2],
        tag: arr[3],
        time: arr[4],
      };
    });
    page.close();
    return bookinfo;
  }
}

start();
