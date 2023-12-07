const router = require("express").Router();

const {
  submitForm,
  getForm,
  deleteForm,
  updateForm,
  addSubmission,
  getSingleSubmission,
} = require("../controllers/formController.js");

router.post("/submitform", submitForm);
router.get("/getform", getForm);
router.delete("/deleteform/:id", deleteForm);
router.patch("/updateform/:id", updateForm);
router.post("/addsubmission/:id", addSubmission); 
router.get("/getsingleform/:id", getSingleSubmission);

module.exports = router;
