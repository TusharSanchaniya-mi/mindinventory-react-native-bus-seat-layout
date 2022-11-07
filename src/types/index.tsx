import type { ColorValue } from 'react-native';
import type { ImageSourcePropType } from 'react-native';

export type SeatType =
  | 'booked'
  | 'available'
  | 'emptySpace'
  | 'door'
  | 'driver'
  | 'blocked'
  | 'women';

export type SelectedSeatType = 'booked' | 'women' | 'blocked';

export type SeatImageAssetsType =
  | 'available'
  | 'booked'
  | 'women'
  | 'blocked'
  | 'driver';

export interface SeatLayout {
  id: string;
  type: SeatType;
  seatNo?: number;
  isStatusChange?: boolean;
  isSeatSeleced?: boolean;
}
export interface Layout {
  columnOne: number;
  columnTwo: number;
}
export interface SelectedSeats {
  seatNumber: number;
  seatType: SelectedSeatType;
}

export type DriverPosition = 'left' | 'right';

export interface AvaiableSeat {
  image: string | ImageSourcePropType;
  tintColor: ColorValue | undefined;
}
export interface BlockedSeat {
  image: string | ImageSourcePropType;
  tintColor: ColorValue | undefined;
}
export interface DriverSeat {
  image: string | ImageSourcePropType;
  tintColor: ColorValue | undefined;
}
