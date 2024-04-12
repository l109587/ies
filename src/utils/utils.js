import { useIntl } from 'umi';

export const language = (key, dynamicContent = {}) => {
  let init = useIntl();
  return init.formatMessage({ id: key }, dynamicContent);
};
