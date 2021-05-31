const express = require("express");
const passport = require("passport");
const router = express.Router();
const appointmentController = require("../../../controllers/api/v1/appointment_controller");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  appointmentController.create
);
router.post(
  //-----send status only to update status confirmed,pending
    "/update/:id",     
    passport.authenticate("jwt", { session: false }),
    appointmentController.update
  );
  router.get(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    appointmentController.delete
  );
  router.get(
    "/get",
    passport.authenticate("jwt", { session: false }),
    appointmentController.get
  );
//router.post('/logIn',userController.logIn);

module.exports = router;
