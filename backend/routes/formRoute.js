const router = require("express").Router();

const {
  submitForm,
  getForm,
  deleteForm,
  updateForm,
  addSubmission,
} = require("../controllers/formController.js");

router.post("/submitform", submitForm);
router.get("/getform", getForm);
router.delete("/deleteform/:id", deleteForm);
router.put("/updateform/:id", updateForm);
router.post("/addsubmission/:id", addSubmission); // New route for adding submissions

module.exports = router;
