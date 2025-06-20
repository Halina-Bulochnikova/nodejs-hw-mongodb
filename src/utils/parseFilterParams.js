// src/utils/parseFilterParams.js

export const parseFilterParams = (query) => {
  const { isFavourite, type } = query;

  return {
    isFavourite: isFavourite === 'true',
    contactType: typeof type === 'string' ? type : undefined,
    
  };
};
  