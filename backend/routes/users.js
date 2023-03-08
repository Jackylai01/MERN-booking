const router = require("express").Router();
const users = require("../controllers/users");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

// 檢查這個TOKEN
// router.get("/checkAuthentication", verifyToken, (req, res, next) => {
//   res.send("hello user,you are logged in ");
// });

// 檢查使用者是誰-系統註冊的會員
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user,you are logged in ");
// });

// 檢查是否為管理員(Admin)，跟上面的不同是管理員可以，新增或刪除相關會員
// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello Admin,you are logged in and you can deletd All users. ");
// });

//UPDATE
router.put("/:id", verifyUser, users.updateUseer);

//DELETE
router.delete("/:id", verifyUser, users.deleteUser);

//GET
router.get("/:id", verifyUser, users.getUser);

//GET ALL
router.get("/", verifyAdmin, users.getUsers);

module.exports = router;
