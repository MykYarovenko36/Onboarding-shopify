import { ResourcePicker } from '@shopify/app-bridge/actions';
import app from './app';

const PICKER_DEFAULT_OPTIONS = {
  selectMultiple: false,
};

export default (type) => {
  return ResourcePicker.create(app, {
    resourceType: ResourcePicker.ResourceType[type],
    options: {
      ...PICKER_DEFAULT_OPTIONS,
    },
  });
};
