import { pick } from 'lodash';

const assignByProps = (obj: any, keys: any) => {
  return pick(obj, keys);
};

export default assignByProps;
