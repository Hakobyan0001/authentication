import { User } from '@prisma/client';
import assignByProps from '../utils/assignByProps';

/**
 * toDTO
 * Takes the data from the model as an argument and converts it into a data transfer object
 */
export function toDTO(model: User): UserDTO {
  return {
    email: model.email.toLowerCase(),
    full_name: model.full_name
  };
}

/**
 * fromDTO
 * Takes the data transfer object as an argument and clears all unnecessary properties from it
 */
export function fromDTO(dto: UserDTO): Partial<User> {
  const props: (keyof UserDTO)[] = ['email', 'id', 'full_name', 'password'];
  return assignByProps(dto, props);
}

type UserDTO = {
  id?: string;
  email: string;
  full_name: string;
  password?: string;
};
