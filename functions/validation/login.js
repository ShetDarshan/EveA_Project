const isEmpty = require("is-empty");
module.exports= function validateLoginData (data) {
    let errors = {};
  
    if (isEmpty(data.email)) errors.email = 'Email must not be empty';
    if (isEmpty(data.password)) errors.password = 'Password must not be empty';
  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };