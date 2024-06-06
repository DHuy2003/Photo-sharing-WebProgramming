/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
function fetchModel(url,request) {
  const token = localStorage.getItem('accesstoken');
  //  console.log(token, request, "Fetching model");
    const model = fetch("http://localhost:8081/" + url, {
      method: request?.method,
      headers: {
        "Content-Type": "application/json",
        Authorization:  "Bearer " + token
      },
      body: request?.body
    });
    return model;
}

export default fetchModel;
