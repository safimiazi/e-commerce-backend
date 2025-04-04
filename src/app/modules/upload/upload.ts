

// import multer, { StorageEngine } from "multer";

// const storage: StorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });


// const uploadService = multer({
//   storage,
// });

// export { uploadService };
import multer from "multer";
import path from "path";
import fs from "fs";
import os from "os";

// সার্ভারলেস-ফ্রেন্ডলি আপলোড ডিরেক্টরি
const getUploadDir = () => {
  // লোকাল ডেভেলপমেন্টের জন্য প্রজেক্ট রুটে uploads ডিরেক্টরি
  if (process.env.NODE_ENV !== 'production') {
    const dir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return dir;
  }
  // প্রডাকশনে শুধুমাত্র /tmp ব্যবহার করুন
  const dir = path.join(os.tmpdir(), 'uploads');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, getUploadDir());
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const uploadService = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB লিমিট
  }
});

export { uploadService };