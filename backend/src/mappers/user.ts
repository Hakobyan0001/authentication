import { user } from '@prisma/client';

/**
 * toDTO
 * Takes the data from the model as an argument and converts it into a data transfer object
 */
export function toDTO(model: user): UserDTO {
  return {
    id: model.id,
    email: model.email.toLowerCase(),
    role: model.role,
    full_name: model.full_name
  };
}

/**
 * fromDTO
 * Takes the data transfer object as an argument and clears all unnecessary properties from it
 */
export function fromDTO(dto: UserDTO, type: 'create' | 'update'): Partial<User> {
  const props: Array<keyof user> = ['email', 'role', 'id', 'full_name'];
  if (type === 'create') {
    const index = props.indexOf('password');
    if (index !== -1) {
      props.splice(index, 1);
    }
  }
  return pick(dto, props);
}

interface UserDTO {
  id: string;
  email: string;
  role: string;
  full_name: string;
}

function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const newObj: any = {};
  keys.forEach((key) => {
    newObj[key] = obj[key];
  });
  return newObj;
}
