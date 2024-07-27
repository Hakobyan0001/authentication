import { User } from '@prisma/client';

import assignByProps from '../utils/assignByProps';

/**
 * toDTO
 * Takes the data from the model as an argument and converts it into a data transfer object
 */
export function toDTO(model: User): UserDTO {
  return {
    email: model.email.toLowerCase(),
    fullName: model.fullName
  };
}

/**
 * fromDTO
 * Takes the data transfer object as an argument and clears all unnecessary properties from it
 */
export function fromDTO(dto: UserDTO): Partial<User> {
  const props: (keyof UserDTO)[] = ['email', 'id', 'fullName', 'password'];
  return assignByProps(dto, props);
}

type UserDTO = {
  id?: string;
  email: string;
  fullName: string;
  password?: string;
};
