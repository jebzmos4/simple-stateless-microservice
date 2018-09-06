/**
 * Created by Morifeoluwa on 06/09/2018.
 * objective: building to scale
 */


function respond(res, data, httpCode) {
  const response = {
    error: data.error,
    code: httpCode,
    message: data.message
  };

  if (data.count) {
    response.count = data.count;
  }
  response.response = data.response;

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Method', '*');


  res.writeHead(httpCode);
  res.end(JSON.stringify(response));
}

module.exports.success = function success(res, response, status = 200) {
  const data = response;
  data.error = false;
  respond(res, data, status);
};

module.exports.failure = function failure(res, response, httpCode = 503) {
  const data = response;
  data.error = true;
  respond(res, data, httpCode);
};

