import { pick } from 'lodash';

function assignByProps(obj: any, keys: any) {
  return pick(obj, keys);
}

export default assignByProps;
