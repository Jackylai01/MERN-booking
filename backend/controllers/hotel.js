const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

const hotelController = {
  //新增hotel
  createHotel: async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
      const saveHotel = await newHotel.save();

      res.status(200).json(saveHotel);
    } catch (err) {
      next(err);
    }
  },
  //更新hotel
  updateHotel: async (req, res, next) => {
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(
        req.params.id, //根據路由url的id 找到該筆對應資料庫的資料
        { $set: req.body }, //$set mongoose 官網解釋找到並取代，找不到則覆蓋
        { new: true }
      );

      res.status(200).json(updatedHotel);
    } catch (err) {
      next(err);
    }
  },
  //刪除
  deleteHotel: async (req, res, next) => {
    try {
      await Hotel.findByIdAndDelete(req.params.id);
      res.status(200).json("Hotel has been deleted.");
    } catch (err) {
      next(err);
    }
  },
  //根據id找到對應的hotel
  getHotel: async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      res.status(200).json(hotel);
    } catch (err) {
      next(err);
    }
  },
  getHotels: async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  },
  countByCity: async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  },
  countByType: async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });

      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  },
  getHotelRooms: async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = hotelController;
