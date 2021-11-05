exports.formatCategoryData = (arrayOfObjects) => {
  const values = arrayOfObjects.map((element) => {
    return [element.slug, element.description];
  });
  return values;
};

exports.formatReviewData = (arrayOfObjects) => {
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
  const values = arrayOfObjects.map((element) => {
    return [element.username, element.avatar_url, element.name];
  });
  return values;
};

exports.formatCommentData = (arrayOfObjects) => {
  const values = arrayOfObjects.map((element) => {
    return [
      element.author,
      element.review_id,
      element.votes,
      element.created_at,
      element.body,
    ];
  });
  return values;
};
