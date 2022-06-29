import createApp from '@shopify/app-bridge';

const API_KEY = process.env.SHOPIFY_API_KEY;
const HOST = window.btoa(process.env.SHOPIFY_STORE_PATH);

export default createApp({
  apiKey: API_KEY,
  host: HOST,
});
