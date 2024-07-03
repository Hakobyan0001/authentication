import { pick } from 'lodash';

function assignByProps(obj: object, keys: string[]) {
  return pick(obj, keys);
}

export default assignByProps;
