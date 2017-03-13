

(function () {
  require('es6-promise').polyfill();
  require('isomorphic-fetch');


  fetch('//api/bears')
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(stories) {
      console.log(stories);
    });

} ());
