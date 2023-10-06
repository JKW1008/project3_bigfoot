import Exception from "../handler/Exception.js";

export const qrForm = (req, res, next) => {
  const { qrCode, latitude, longitude } = req.body;
  if(!qrCode) return res.status(Exception.QR_EMPTY.statusCode).json(Exception.QR_EMPTY);
  else if(!latitude || !longitude) return res.status(Exception.LOCATION_EMPTY.statusCode).json(Exception.LOCATION_EMPTY);
  next();
}