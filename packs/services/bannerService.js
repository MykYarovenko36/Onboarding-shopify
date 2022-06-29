class BannerService {
  __BASE_URL = process.env.DB_BASE_URL;
  __CONFIG = {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.SHOPIFY_API_KEY,
    },
  };

  __createUrl = (queryParams = '?') =>
    `${this.__BASE_URL}/api/v1/banners${queryParams}`;

  getAll = async () => {
    const url = this.__createUrl();
    return await fetch(url, this.__CONFIG).then((res) => res.json());
  };

  getSingle = async (id) => {
    const url = this.__createUrl(`/${id}`);
    return await fetch(url, this.__CONFIG).then((res) => res.json());
  };

  create = async (data) => {
    const url = this.__createUrl('');
    return await fetch(url, {
      ...this.__CONFIG,
      method: 'POST',
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };

  update = async (id, data) => {
    const url = this.__createUrl(`/${id}`);
    return await fetch(url, {
      ...this.__CONFIG,
      method: 'PUT',
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };

  delete = async (id) => {
    const url = this.__createUrl(`/${id}`);
    return await fetch(url, {
      method: 'DELETE',
    }).then((res) => res.json());
  };
}

export default BannerService;
