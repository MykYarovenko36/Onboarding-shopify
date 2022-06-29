import { History } from '@shopify/app-bridge/actions';
import app from './app';

export default (type, path) =>
  History.create(app).dispatch(History.Action[type], path);
