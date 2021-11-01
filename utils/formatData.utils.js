exports.formatCategoryData = (arrayOfObjects) => {
  if (
    arrayOfObjects.length === 0 ||
    Object.keys(arrayOfObjects[0]).length === 0
  ) {
    return [[]];
  }
  const values = arrayOfObjects.map((element) => {
    return [element.slug, element.description];
  });
  return values;
};
