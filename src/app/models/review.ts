import {Room} from "./room";
import {User} from "./user";
 export interface Booking {
  id?: number;
  room: Room;
  user: User;
}

export interface Review{
  id?: number;
  rating?: number;
  reviewBody?: string;
  booking: {};
}
