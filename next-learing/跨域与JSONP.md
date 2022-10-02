# 跨域与 JSONP

##### 同源策略

同源：两页面协议、域名、端口相同

浏览器网页默认端口 80

同源策略：浏览器安全功能-限制来源同一个加载文档脚本与其他源资源的交互

- 阻止读取非同源网页的 cookie、localstorage 与 indexedDB
- 阻止接触非同源网页的 DOM
- 阻止向非同源地址发送 Ajax 请求

跨域：非同源

浏览器会拦截跨域请求回来的数据

##### JSONP

JSON 的一种使用模式，实现跨域数据访问

由于 script 标签允许请求非同源的 js 脚本

利用 script 标签请求，并传递一个回调函数名作为参数；服务器端把数据作为回调函数参数包装后返回；浏览器自动执行回调函数代码，即实现数据渲染

JSONP：兼容性好、只支持 GET 请求

CORS：支持 GET 与 POST，不兼容低版本浏览器

```html
<div id="divCustomers"></div>
<script type="text/javascript">
  function callbackFunction(result, methodName) {
    var html = "<ul>";
    for (var i = 0; i < result.length; i++) {
      html += "<li>" + result[i] + "</li>";
    }
    html += "</ul>";
    document.getElementById("divCustomers").innerHTML = html;
  }
</script>
<script
  type="text/javascript"
  src="https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=callbackFunction"
></script>
```

jQuery 实现用户端

采用动态创建与移除 script 标签：向 head 内添加 script 标签

```html
<div id="divCustomers"></div>
<script>
  $.getJSON(
    "https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=?",
    function (data) {
      var html = "<ul>";
      for (var i = 0; i < data.length; i++) {
        html += "<li>" + data[i] + "</li>";
      }
      html += "</ul>";

      $("#divCustomers").html(html);
    }
  );
</script>

<script>
  $.ajax({
      url: 'https:www.sky.icu',
      dataType: 'jsonp', // 必需
      success: (res) => {
          console.log(e);
      },
      jsonp: 'callback'  // 发送至服务器参数名称：可选
      jsonpCallback: 'jQueryxxx',  // 自定义回调函数名称：可选
  })
</script>
<!-- 会自动带一个jQueryXXXX的回调函数名称 -->
```

服务器端

```php
<?php
    header('Content-type: application/json');
    //获取回调函数名
    $jsoncallback = htmlspecialchars($_REQUEST ['jsoncallback']);
    //json数据
    $json_data = '["customername1","customername2"]';
    //输出jsonp格式的数据
    echo $jsoncallback . "(" . $json_data . ")";
?>
```

##### 节流

节流，就是指连续触发事件但是在 n 秒中只执行一次函数

减少事件触发频率

- 使得鼠标事件仅在单位时间内触发一次
- 降低监测滚动条位置的频率

```js
// 时间戳
function throttle(func, delay) {
  let prev = 0; // 上次触发时间
  return function (...args) {
    const now = Date.now();
    if (now - prev > delay) {
      last = now;
      func.apply(this, args);
    }
  };
}

// 定时器
function throttle(func, delay) {
  let timeout = null;
  return function (...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(this, args);
      });
    }
  };
}
```

##### 防抖

防抖，就是指触发事件后 n 秒后才执行函数，如果在 n 秒内又触发了事件，则会重新计算函数执行时间

常用于搜索

```js
// 非立即执行
// 触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
function debounce(func, delay) {
  let timer = null; // 上次调用指向的计时器
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 立即执行
// 触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果
function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeOut(timer);
    const cal = !timer;
    timer = setTimeOut(() => {
      timer = null;
    }, delay);
    if (cal) func.apply(this, args);
  };
}
```
