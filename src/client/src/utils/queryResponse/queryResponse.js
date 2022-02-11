export const mapQueryData = (mapper) => (response) => {
  if (response.loading || response.error) {
    return response;
  }

  return {
    ...response,
    data: mapper(response.data),
  };
};
