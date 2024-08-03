import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'coverImageUploads'; 

    fs.access(uploadPath, (err) => {
      if (err) {
        // Directory doesn't exist, create it
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
          if (err) {
            return cb(err, 'Could not create directory');
          }
          cb(null, uploadPath);
        });
      } else {
        cb(null, uploadPath);
      }
    });
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename);
  }
});

const fileUpload = multer({ storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

module.exports = fileUpload;
