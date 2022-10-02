var request = require('request');
var Cookie = require('request-cookies').Cookie;
const scparser = require("set-cookie-parser");
const util = require('util')
const fetch = require("node-fetch") //npm install node-fetch@2
var summaryArr = [];

async function getActiveRecipe(xsrf_token, workato_app_session) {
    const response = await fetch('https://app.workato.com/dashboard/flows.json?recipe_type=active', {
        method: 'GET',
        headers: {
            'Host': ' app.workato.com',
            'User-Agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:105.0) Gecko/20100101 Firefox/105.0',
            'Accept': ' text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': ' en-US,en;q=0.5',
            //'Accept-Encoding': ' gzip, deflate, br',
            'Connection': ' keep-alive',
            'Cookie': ' XSRF-TOKEN=' + xsrf_token + '; _workato_app_session=' + workato_app_session + '; ',
            'Upgrade-Insecure-Requests': ' 1',
            'Sec-Fetch-Dest': ' document',
            'Sec-Fetch-Mode': ' navigate',
            'Sec-Fetch-Site': ' none',
            'Sec-Fetch-User': ' ?1'
        }
    })

    const body = await response.text();
    //console.log(body)
    return (body)
}


async function getJob(xsrf_token, workato_app_session, recipe_id) {
    const response = await fetch('https://app.workato.com/web_api/recipes/' + recipe_id + '/jobs.json', {
        method: 'GET',
        headers: {
            'Host': ' app.workato.com',
            'User-Agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:105.0) Gecko/20100101 Firefox/105.0',
            'Accept': ' text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': ' en-US,en;q=0.5',
            //'Accept-Encoding': ' gzip, deflate, br',
            'Connection': ' keep-alive',
            'Cookie': ' XSRF-TOKEN=' + xsrf_token + '; _workato_app_session=' + workato_app_session + '; ',
            'Upgrade-Insecure-Requests': ' 1',
            'Sec-Fetch-Dest': ' document',
            'Sec-Fetch-Mode': ' navigate',
            'Sec-Fetch-Site': ' none',
            'Sec-Fetch-User': ' ?1'
        }
    })

    const body = await response.text();
    //console.log(body)
    return (body)
}

async function getSignSession() {
    var options = {
        'method': 'GET',
        'url': 'https://app.workato.com/web_api/auth_user.json',
        'headers': {
            'Host': ' app.workato.com',
            'User-Agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:105.0) Gecko/20100101 Firefox/105.0',
            'Accept': ' application/json, text/plain, */*',
            'Accept-Language': ' en-US,en;q=0.5',
            'Referer': ' https://app.workato.com/users/sign_in',
            'Content-Type': ' application/json',
            'Connection': ' keep-alive',
            'Sec-Fetch-Dest': ' empty',
            'Sec-Fetch-Mode': ' cors',
            'Sec-Fetch-Site': ' same-origin'
        }

    };
    request(options, async function(error, response) {
        if (error) throw new Error(error);
        //console.log(response);
        var rawcookies = response.headers['set-cookie'];
        //console.log(rawcookies)

        let xsrf_token = '';
        let workato_app_session = '';

        for (var i in rawcookies) {
            var cookie = new Cookie(rawcookies[i]);
            //console.log(cookie.key, cookie.value, cookie.expires);

            if (cookie.key === 'XSRF-TOKEN') {
                xsrf_token = cookie.value
            }

            if (cookie.key === '_workato_app_session') {
                workato_app_session = cookie.value
            }
        }

        console.log('xsrf_token: ' + xsrf_token);
        console.log('workato_app_session: ' + workato_app_session);

        getSession(xsrf_token, workato_app_session)

    });
}



async function getSession(x_csrf_token, _workato_app_session) {
    var x_csrf_token = decodeURIComponent(x_csrf_token.replace(/\+/g, " "));
    var _workato_app_session = decodeURIComponent(_workato_app_session.replace(/\+/g, " "))

    var options = {
        'method': 'POST',
        'url': 'https://app.workato.com/users/sign_in.json',
        'headers': {
            'Host': ' app.workato.com',
            'User-Agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:105.0) Gecko/20100101 Firefox/105.0',
            'Accept': ' application/json, text/plain, */*',
            'Accept-Language': ' en-US,en;q=0.5',
            'Referer': ' https://app.workato.com/users/sign_in',
            'X-CSRF-TOKEN': x_csrf_token,
            'X-Requested-With': ' XMLHttpRequest',
            'Content-Type': ' application/json',
            'Origin': ' https://app.workato.com',
            'Connection': ' keep-alive',
            'Cookie': '; _workato_app_session=' + _workato_app_session,
            'Sec-Fetch-Dest': ' empty',
            'Sec-Fetch-Mode': ' cors',
            'Sec-Fetch-Site': ' same-origin'
        },
        body: '{"user":{"email":"<EMAIL>","password":"<PWD>"}}'
    };

    //console.log(options)
    request(options, async function(error, response) {
        if (error) throw new Error(error);
        //console.log(response);
        var rawcookies = response.headers['set-cookie'];
        //console.log(rawcookies)

        let xsrf_token = '';
        let workato_app_session = '';

        for (var i in rawcookies) {
            var cookie = new Cookie(rawcookies[i]);
            //console.log(cookie.key, cookie.value, cookie.expires);

            if (cookie.key === 'XSRF-TOKEN') {
                xsrf_token = cookie.value
            }

            if (cookie.key === '_workato_app_session') {
                workato_app_session = cookie.value
            }
        }

        console.log('xsrf_token: ' + xsrf_token);
        console.log('workato_app_session: ' + workato_app_session);


        var activeRecipe = await getActiveRecipe(xsrf_token, workato_app_session);
        var res_activeRecipe = JSON.parse(activeRecipe);
        console.log(res_activeRecipe.result.flows.length)
        for (let i = 0; i < res_activeRecipe.result.flows.length; i++) {
            let recipe_id = res_activeRecipe.result.flows[i].id;
            let recipe_name = res_activeRecipe.result.flows[i].description;
            //console.log(recipe_id);

            var getJobres = await getJob(xsrf_token, workato_app_session, recipe_id);
            var res_getJob = JSON.parse(getJobres);
            //console.log(res_getJob.jobs[0])

            let job_id = res_getJob.jobs[0].id;
            let master_job_id = res_getJob.jobs[0].master_job_id;
            let calling_job_id = res_getJob.jobs[0].calling_job_id;
            let calling_recipe_id = res_getJob.jobs[0].calling_recipe_id
            let started_at = res_getJob.jobs[0].started_at;
            let completed_at = res_getJob.jobs[0].completed_at;
            let status = res_getJob.jobs[0].status;

            let timeDifference = 0;
            let firstDate;
            let secondDate;

            if (started_at && completed_at) {
                let firstDate = new Date(started_at),
                    secondDate = new Date(completed_at),
                    timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());


                console.log(started_at + " : " + completed_at)
                console.log(timeDifference)

                summaryArr.push({
                    recipe_id: recipe_id,
                    recipe_name: recipe_name,
                    job_id: job_id,
                    calling_job_id: calling_job_id,
                    calling_recipe_id: calling_recipe_id,
                    master_job_id: master_job_id,
                    status: status,
                    started_at: started_at,
                    completed_at: completed_at,
                    duration: timeDifference
                })
            } else {
                console.log(started_at + " : " + completed_at)
                console.log(timeDifference)

                summaryArr.push({
                    recipe_id: recipe_id,
                    recipe_name: recipe_name,
                    status: status,
                    started_at: started_at,
                    completed_at: completed_at,
                    duration: 0
                })
            }
        }

        //console.log(summaryArr);
        console.log(util.inspect(summaryArr, {
            showHidden: false,
            depth: null,
            maxArrayLength: null
        }));

    });
}


//getSession()
getSignSession();
