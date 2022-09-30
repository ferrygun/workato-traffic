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
    'Accept-Encoding': ' gzip, deflate, br',
    'Referer': ' https://app.workato.com/users/sign_in',
    'X-CSRF-TOKEN': ' <X-CSRF-TOKEN>',
    'X-Requested-With': ' XMLHttpRequest',
    'Content-Type': ' application/json',
    'Content-Length': ' 82',
    'Origin': ' https://app.workato.com',
    'Connection': ' keep-alive',
    'Cookie': ' _gcl_au=1.1.18409465.1664454722; _ga_DLJES99XH4=GS1.1.1664454721.1.1.1664455256.0.0.0; _ga=GA1.2.1039239048.1664454722; XSRF-TOKEN=<X-CSRF-TOKEN>; _workato_app_session=<workato_app_session>; _ga_B6WM800FKK=GS1.1.1664454733.1.1.1664457750.0.0.0; _gid=GA1.2.153595559.1664454735; _workato_preferred_theme=light; _biz_uid=f55b4d5dcc864db3f0e5ad1766d15319; _biz_nA=2; _biz_pendingA=%5B%22m%2Fipv%3F_biz_r%3Dhttps%253A%252F%252Fapp.workato.com%252F%26_biz_h%3D805003586%26_biz_u%3Df55b4d5dcc864db3f0e5ad1766d15319%26_biz_s%3D702fcd%26_biz_l%3Dhttps%253A%252F%252Fwww.workato.com%252F%26_biz_t%3D1664455135490%26_biz_i%3DThe%2520Modern%2520Leader%2520in%2520Automation%2520%257C%2520Workato%26_biz_n%3D0%26rnd%3D724378%22%2C%22m%2Fipv%3F_biz_r%3Dhttps%253A%252F%252Fapp.workato.com%252F%26_biz_h%3D805003586%26_biz_u%3Df55b4d5dcc864db3f0e5ad1766d15319%26_biz_s%3D702fcd%26_biz_l%3Dhttps%253A%252F%252Fwww.workato.com%252F%26_biz_t%3D1664455250551%26_biz_i%3DWorkato%2520%25E2%2580%2594%2520Connect%2520your%2520apps.%2520Automate%2520your%2520work.%2520%257C%2520Workato%26_biz_n%3D1%26rnd%3D934226%22%5D; _uetsid=f313f4a03ff311edb36ced3cec544d59; _uetvid=f313f7603ff311ed8d4015f01e36892f; _mkto_trk=id:741-DET-352&token:_mch-workato.com-1664455252297-68449; _fbp=fb.1.1664455253675.1373698447; _clck=1xlm4l|1|f5a|0; mp_82bf774ad54aed4c4be68d97e417d13c_mixpanel=%7B%22distinct_id%22%3A%20%2236074%22%2C%22%24device_id%22%3A%20%22183893bb9e762-088f5ad7872f8a-402b2c31-168000-183893bb9e8737%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.workato.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.workato.com%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%2C%22%24user_id%22%3A%20%2236074%22%7D; mktg_user=logged; XSRF-TOKEN=Lyj1a4XT5Cb2baP%2B4bc12NAT5YSmLB%2F2LkI%2FftO7yX9Y34flpN5iiLD8LtdhDp933e7k1c898Vc6%2BLptdlQO%2FA%3D%3D; _workato_app_session=b0RwaUFleUwyN3MrWFNHNzlDTmt6ZFhGZndtQ0x4TGNEWWwxaDNuSVNodjF3akZJMk1zaXlVaGJETVRUV1Y1d0NaZDkyUzRZZE1pbFpjekZ5ZGlHb3R1TmlnSnIxdTcwY1BTWkFaRHhXdUZxV29zUGdnRVNEL1ZJdDI3U1E2UEJRc05ScTZua1VHbVNld3Q0Z3BpWUpFVGVKQmkvYkV1TTNycHFhVlR4d09QYTliMDZlelJpQkFyRG9oV0JSWUhqdGlsakFQMWdLK2k2dE9McEFtcVFqYjNKSWFLcnVUWG5neU9nQS9JaE4vMHU5K1hVVmhWZlJsYlltUytVelZJc1owVnRFMTBodFNpMlcraDVDeldtVkFJTnpqREhEWWJQZlN6UW0xd0FHRHg2MDdKNUE3MitaVlEvcTNCN1dlZjVpa3dPaDY3eWd3WmdHeTJ2ei8vQmNNLzNORWY1RTRrdG9qWTd5eVh1MjRJYnBOWnlaTVdFOEljazZ3aENwMlI3S2R3UE92a2NZbHN3bjU5NEhUaTBoMjdDdmM2ZVdVODhWNEhDdHFVSEtHeDVCS0xaU3BuS2dPaU9ZSGMyYytvM21nWlpvZ25nbGg1MzNyUjYxRCtnakpJRlNtVkFidUtKK3plczU3aDY5b2hSdGVHTXBqZVdHTXgvZXlxS01rdUtWekVsZ1IwUDQvcHU2N1NoSUgxZks2cmNyM0xDUDdlWjEzdnZuWHRrTGk2bUZVTE9PQmJOZHNpYWlDVUZZV2hnY2tiUjZuUitmN3F2QVpEZzZZZGwxekdrcERSejRIOGJ4bDZ3aFpudjhCdGRFcWhMOEhQbVA1djMwN0hXRmFibmwyMnRKYnR1ZXNlTllTWWxyU2JzTVkyVlozbW0wYUNnUnBmSFJSdFNDdmZDR0NUQXRuVGM3N0tmMFpJcmFadER4eC94anY2Qm42QVNZSTZjTk0vYTU4aXlrL25EeGpOUGg0cFRtUzZ3MnFQbTNNajZqbUErSmdHZ2V6T3M2ZTg0WmIvU2RBYU9JQi90QnlSL2pGK1BCTFdkbURaVERBZVcxQ3pwMERXRk5nTlJRbCtXWXpzQnQwTmY1ejV3TXhTNVBsdlRxaC9RdGZnSkoraEphMUdJa2pIc1RxOE01di9ETW1nS0dZMFE0cEgweENqRnVCRlRqaFBvVGhOb1cwK2tGc2RpL1lMVzZzVzN3K1U4OVhOM0JnPT0tLUFGR2VjSkUxQWdlUlE1dml3NlU0L2c9PQ%3D%3D--271a9633d0b5b1d23c546bec663cf2d86caf33a4',
    'Sec-Fetch-Dest': ' empty',
    'Sec-Fetch-Mode': ' cors',
    'Sec-Fetch-Site': ' same-origin'
  },
  body: '{"user":{"email":"<EMAIL_ADDR>","password":"<PWD>"}}'

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
      //'Accept-Encoding': ' gzip, deflate, br',
      'Connection': ' keep-alive',
      'Cookie': '_gcl_au=1.1.18409465.1664454722; _ga_DLJES99XH4=GS1.1.1664454721.1.1.1664455256.0.0.0; _ga=GA1.1.1039229048.1664454722; XSRF-TOKEN=' + xsrf_token + '; _workato_app_session=' +  workato_app_session + '; _ga_B6WM800FKK=GS1.1.1664454733.1.1.1664458435.0.0.0; _gid=GA1.2.153595559.1664454735; _workato_preferred_theme=light; _biz_uid=f55b4d5dcc864db3f0e5ad1766d15319; _biz_nA=2; _biz_pendingA=%5B%22m%2Fipv%3F_biz_r%3Dhttps%253A%252F%252Fapp.workato.com%252F%26_biz_h%3D805003586%26_biz_u%3Df55b4d5dcc864db3f0e5ad1766d15319%26_biz_s%3D702fcd%26_biz_l%3Dhttps%253A%252F%252Fwww.workato.com%252F%26_biz_t%3D1664455135490%26_biz_i%3DThe%2520Modern%2520Leader%2520in%2520Automation%2520%257C%2520Workato%26_biz_n%3D0%26rnd%3D724378%22%2C%22m%2Fipv%3F_biz_r%3Dhttps%253A%252F%252Fapp.workato.com%252F%26_biz_h%3D805003586%26_biz_u%3Df55b4d5dcc864db3f0e5ad1766d15319%26_biz_s%3D702fcd%26_biz_l%3Dhttps%253A%252F%252Fwww.workato.com%252F%26_biz_t%3D1664455250551%26_biz_i%3DWorkato%2520%25E2%2580%2594%2520Connect%2520your%2520apps.%2520Automate%2520your%2520work.%2520%257C%2520Workato%26_biz_n%3D1%26rnd%3D934226%22%5D; _uetsid=f313f4a03ff311edb36ced3cec544d59; _uetvid=f313f7603ff311ed8d4015f01e36892f; _mkto_trk=id:741-DET-352&token:_mch-workato.com-1664455252297-68449; _fbp=fb.1.1664455253675.1373698447; _clck=1xlm4l|1|f5a|0; mktg_user=logged; mp_82bf774ad54aed4c4be68d97e417d13c_mixpanel=%7B%22distinct_id%22%3A%20%2236074%22%2C%22%24device_id%22%3A%20%22183893bb9e762-088f5ad7872f8a-402b2c31-168000-183893bb9e8737%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.workato.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.workato.com%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%2C%22%24user_id%22%3A%20%2236074%22%7D',
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
