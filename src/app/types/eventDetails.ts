export interface eventDetailsType {
  ticketStatusColor:string;
  ticketStatusName: string;
  id:string,
  name: string,
  attractions: string[],
  attractionsUrl: string[],
  classifications: string[],
  priceRanges_min: Number,
  priceRanges_max: Number,
  ticketStatus: string,
  buyAt: string,
  seatMap: string,
  localDate: string,
  localTime: string,
  venue: string,
  venueId:string
}


// References
// https://vegibit.com/how-to-use-an-interface-in-angular/
// https://stackoverflow.com/questions/36749030/create-instance-using-an-interface
