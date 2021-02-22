import {User} from './user';
import {Province} from './province';
import {PropertyType} from './property-type';
import {BookingImage} from './booking-image';

export interface Room {
  id?: number;
  name?: string;
  description?: string;
  address?: string;
  pricePerNight?: number;
  totalOfBedroom?: number;
  totalOfBathroom?: number;
  status?: boolean;
  cancelled?: boolean;
  user?: User;
  province?: Province;
  propertyType?: PropertyType;
  bookingImages?: BookingImage[];
}
