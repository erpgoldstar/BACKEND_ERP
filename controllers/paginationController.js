const paginationController = (model, page) => {
  const limit = 10;
  const startIndex = (page - 1) * limit;
  const lastIndex = page * limit;

  const results = {};

  results.modelResults = model.slice(startIndex, lastIndex);

  results.totalPages = Math.ceil(model.length / limit);

  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  if (lastIndex < model.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  const paginatedResults = results;

  return paginatedResults;
};

module.exports = { paginationController };
