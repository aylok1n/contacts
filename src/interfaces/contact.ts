export enum Gender {
  FEMALE = 'female',
  MALE = 'male'
}

export interface Contact {
  id: string,
  picture: string,
  age: number,
  name: string,
  gender: Gender,
  company: string,
  email: string,
  phone: string,
  address: string
  about: string
}
