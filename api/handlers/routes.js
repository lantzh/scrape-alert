import { Router } from "express";
import { saveUserData } from "../services/dynamoService.js";

const router = Router();

export default (userId, dataType) => {
  // Test route
  router.get("/test", (req, res) => {
    res.json({ message: "Lambda route works!" });
  });

  // Form route
  router.post("/form-data", async (req, res) => {
    const { url, keywords, phone } = req.body;

    console.log("Received form data:", { url, keywords, phone });
    console.log("Using userId and dataType:", { userId, dataType });

    try {
      // Use userId and dataType from the passed arguments
      await saveUserData(userId, dataType, url, keywords, phone);
      res.status(200).json({ message: "Form data saved successfully" });
    } catch (error) {
      console.error("Error in saveUserData:", error); // Log the error for debugging
      res
        .status(500)
        .json({ error: "Failed to save data", details: error.message });
    }
  });

  return router;
};
