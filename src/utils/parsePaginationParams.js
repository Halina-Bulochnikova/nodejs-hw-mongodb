// src/utils/parsePaginationParams.js

export const parsePaginationParams = (query) => {
    const page = parseInt(query.page, 10) || 1;
    const perPage = parseInt(query.perPage, 10) || 10;
  
    return { page, perPage };
  };
  