const parseProduct = (item) => {
  const { id, title, descriptionHtml: content } = item;
  const subId = '/Product/';
  return {
    id: 'new',
    title,
    content,
    style: { 'background-color': 'blue' },
    product_id: id.substring(id.indexOf(subId) + subId.length),
  };
};

export default (product) => parseProduct(product[0]);
