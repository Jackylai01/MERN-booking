const router = require("express").Router();
const hotelController = require("../controllers/hotel");
const { verifyAdmin } = require("../utils/verifyToken");

//新增
router.post("/", hotelController.createHotel);

//更新
router.put("/:id", verifyAdmin, hotelController.updateHotel);

//刪除
router.delete("/:id", verifyAdmin, hotelController.deleteHotel);

//獲取
router.get("/find/:id", hotelController.getHotel);

//獲取全部
router.get("/", hotelController.getHotels);

router.get("/countByCity", hotelController.countByCity);
router.get("/countByType", hotelController.countByType);
router.get("/room/:id", hotelController.getHotelRooms);

module.exports = router;
