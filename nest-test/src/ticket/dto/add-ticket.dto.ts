export class AddTicketDto {
  id: number;
  name: string;
  desc: string;
  type: 0 | 1 | 2;
  price: number;
  scenerySpotId: number;
}
