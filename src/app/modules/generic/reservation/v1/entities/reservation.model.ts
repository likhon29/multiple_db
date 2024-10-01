import { Schema, model } from "mongoose";
import { TReservation } from "../rest";

const ReservationSchema = new Schema<TReservation>({

});

export const ReservationModel = model<TReservation>("Reservation", ReservationSchema);