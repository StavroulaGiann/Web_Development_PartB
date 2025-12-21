const router = require("express").Router();
const { getBooks, getBookByKey } = require("../controllers/books-controller");

router.get("/", getBooks);
router.get("/:key", getBookByKey);

module.exports = router;
