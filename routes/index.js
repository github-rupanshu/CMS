const express = require("express");

const router = express.Router();

console.log("router loaded");

// router.get('/', homeController.home);
// router.use('/users', require('./users'));
// router.use('/posts', require('./posts'));
// router.use('/comments', require('./comments'));

router.use("/api", require("./api"));

router.get("/ping", (req, res) => {
  return res.status(200).json({
    msg: "Ping !!!",
    gitUrl: "https://github.com/github-rupanshu/CMS.git",
  });
});
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

module.exports = router;
