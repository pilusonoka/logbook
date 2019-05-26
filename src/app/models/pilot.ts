import { User } from 'firebase';
export class Pilot {

  static fromAuth(user: User) {
    return {
      name: user.displayName,
      uid: user.uid,
      phoneNumber: user.phoneNumber,
      email: user.email,
      photoUrl: user.photoURL
    } as Pilot;
  }
  uid: string;
  name: string;
  email: string;
  phoneNumber: string;
  aircrafts: string[];
  photoUrl: string;
}