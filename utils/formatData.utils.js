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

exports.formatReviewData = (arrayOfObjects) => {
  if (
    arrayOfObjects.length === 0 ||
    Object.keys(arrayOfObjects[0]).length === 0
  ) {
    return [[]];
  }

  const values = arrayOfObjects.map((element) => {
    return [
      element.title,
      element.review_body,
      element.designer,
      element.review_img_url,
      element.votes,
      element.category,
      element.owner,
      element.created_at,
    ];
  });
  return values;
};

exports.formatUserData = (arrayOfObjects) => {
  if (
    arrayOfObjects.length === 0 ||
    Object.keys(arrayOfObjects[0]).length === 0
  ) {
    return [[]];
  }
  const values = arrayOfObjects.map((element) => {
    return [element.username, element.avatar_url, element.name];
  });
  return values;
};
