const router = require("express").Router();
const { verifyAdmin } = require("../utils/verifyToken");
const roomControllers = require("../controllers/room");

//新增
router.post("/:hotelid", roomControllers.createRoom);

//更新
router.put("/availability/:id", roomControllers.updateRoomAvailability);
router.put("/:id", verifyAdmin, roomControllers.updateRoom);

//刪除
router.delete("/:id/:hotelid", verifyAdmin, roomControllers.deleteRoom);

//根據id 找到 房間
router.get("/:id", roomControllers.getRoom);

//找到全部房間
router.get("/", roomControllers.getRooms);

module.exports = router;
