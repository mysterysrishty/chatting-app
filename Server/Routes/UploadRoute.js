import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// ✅ Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    // create unique filename to avoid overwrite
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// ✅ File filter (optional but recommended)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// ✅ Multer upload setup
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// ✅ Upload route
router.post("/", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json("No file uploaded");
    }

    return res.status(200).json({
      message: "File uploaded successfully ✅",
      filename: req.file.filename,
      path: `/images/${req.file.filename}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Upload failed ❌");
  }
});

export default router;