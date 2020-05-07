const passport = require("passport");
const { Router } = require("express");
const upload = require("../middleware/upload");

const postController = require("../controllers/post.controller");

const getPassport = () => passport.authenticate("jwt", { session: false });

const router = Router();

// Admin
router.post(
  "/admin",
  getPassport(),
  upload.single("image"),
  postController.create
);
router.get("/admin", getPassport(), postController.getAll);
router.get("/admin/:id", getPassport(), postController.getById);
router.put("/admin/:id", getPassport(), postController.update);
router.delete("/admin/:id", getPassport(), postController.delete);

router.get("/admin/get/analytics", getPassport(), postController.getAnalytics);

// Base
router.get("/", postController.getAll);
router.get("/:id", postController.getById);
router.put("/add/view/:id", postController.addView);

module.exports = router;
