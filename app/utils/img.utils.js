import fs from 'fs';
import path from 'path';

async function createProductFolder(productFolderPath) {
  try {
    if (!fs.existsSync(productFolderPath)) {
      await fs.promises.mkdir(productFolderPath);
      console.log('Папка создана'.green.bold);
    } else {
      const files = await fs.promises.readdir(productFolderPath);

      for (const file of files) {
        const filePath = path.join(productFolderPath, file);
        await fs.promises.unlink(filePath);
        console.log(`Файл ${file} успешно удален`.green.bold);
      }
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function moveImage(image, imgFilePath) {
  try {
    await image.mv(imgFilePath);
    console.log(`Файл ${image.name} успешно создан`.green.bold);
  } catch (err) {
    console.error(`Ошибка при создании файла ${image.name}: ${err}`.red.bold);
    throw err; // Прокидываем ошибку выше, чтобы её обработать в обработчике ошибок
  }
}

export { createProductFolder, moveImage };
