export const request = ({
    method = 'GET',
    url,
    timeout = 1500,
    ontimeout = (e) => {
        console.log(e);
    },
    contenttype: content_type = 'application/x-www-form-urlencoded',
    data = {},
    success = (res) => {
        console.log(res);
    },
}) => {
    let request = new XMLHttpRequest();

    request.open(method, url, true);

    request.onreadystatechange = function () {
        if(this.status === 400 && this.readyState === 4) {
            success(this.responseText);
        }
    }

    request.timeout = timeout;
    request.ontimeout = ontimeout;

    request.setRequestHeader('Content-Type', content_type);

    request.send(data);
};