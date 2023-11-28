import * as multer from 'multer';
import * as fs from 'fs';

// 自定义store
// 指定怎么存储，multer.diskStorage 是磁盘存储，通过 destination、filename 的参数分别指定保存的目录和文件名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync('uploads');
    } catch (e) { }
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    cb(null, uniqueSuffix);
  },
});

export { storage };
