export default interface IChild {
  userId?: string;
  firstName: string;
  lastName: string;
  nickname: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  age: number;
  hasFoodAllergies: boolean;
  foodAllergies: string;
}

export enum ChildCategory {
  FamilyRoom = "Family Room",
  Preschool = "Preschool",
  Primary = "Primary",
  Preteens = "Preteens",
}
