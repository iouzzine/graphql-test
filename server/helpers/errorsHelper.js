const Validation = err => {
  let errors = [];
  err.details.map(error => {
    type = error.type.split('.');
    errors.push({
      name: error.context.label,
      message: error.message,
      type: type[1]
    });
  });

  return {
    status: false,
    errors
  };
};

const Api = err => {
  errors = {
    name: err.name,
    message: err.message
  };

  return {
    status: false,
    errors,
    type: 'API'
  };
};

const ApiMessage = message => {
  return {
    status: false,
    message,
    type: 'API'
  };
};

module.exports = { Validation, Api, ApiMessage };
