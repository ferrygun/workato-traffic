var request = require('request');
var Cookie = require('request-cookies').Cookie;

var options = {
  'method': 'POST',
  'url': 'https://app.workato.com/users/sign_in.json',
  'headers': {
    'Host': ' app.workato.com',
    'User-Agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:105.0) Gecko/20100101 Firefox/105.0',
    'Accept': ' application/json, text/plain, */*',
    'Accept-Language': ' en-US,en;q=0.5',
    'Referer': ' https://app.workato.com/users/sign_in',
    'X-CSRF-TOKEN': '<X-CSRF-TOKEN>',
    'X-Requested-With': ' XMLHttpRequest',
    'Content-Type': ' application/json',
    'Origin': ' https://app.workato.com',
    'Connection': ' keep-alive',
    'Cookie': '; _workato_app_session=<WORKATO_APP_SESSION>;',
    'Sec-Fetch-Dest': ' empty',
    'Sec-Fetch-Mode': ' cors',
    'Sec-Fetch-Site': ' same-origin'
  },
  body: '{"user":{"email":"<EMAIL>","password":"<PWD>"}}'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  //console.log(response);
  var rawcookies = response.headers['set-cookie'];
  //console.log(rawcookies)

  let xsrf_token = '';
  let workato_app_session = '';

  for (var i in rawcookies) {
    var cookie = new Cookie(rawcookies[i]);
    //console.log(cookie.key, cookie.value, cookie.expires);

    if(cookie.key === 'XSRF-TOKEN') {
      xsrf_token = cookie.value
    }

    if(cookie.key === '_workato_app_session') {
      workato_app_session = cookie.value
    }
  }

  console.log('xsrf_token: ' + xsrf_token);
  console.log('workato_app_session: ' + workato_app_session);

  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'https://app.workato.com/dashboard/flows.json?started_at_from=2022-08-29T11%3A54%3A46.800%2B08%3A00&started_at_to=2022-09-28T11%3A54%3A46.800%2B08%3A00&sort_term=failed_job_count&sort_direction=asc',
    'headers': {
      'Host': ' app.workato.com',
      'User-Agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:105.0) Gecko/20100101 Firefox/105.0',
      'Accept': ' text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': ' en-US,en;q=0.5',
      'Connection': ' keep-alive',
      'Cookie': ' XSRF-TOKEN=' + xsrf_token + '; _workato_app_session=' +  workato_app_session + '; ',
      'Upgrade-Insecure-Requests': ' 1',
      'Sec-Fetch-Dest': ' document',
      'Sec-Fetch-Mode': ' navigate',
      'Sec-Fetch-Site': ' none',
      'Sec-Fetch-User': ' ?1'
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });

});
