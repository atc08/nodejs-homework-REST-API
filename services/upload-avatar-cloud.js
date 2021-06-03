const fs = require('fs/promises');

class Upload {
  constructor(uploadCloud) {
    this.uploadCloud = uploadCloud;
  }

  // async transformAvatar(pathFile) {
  //   const file = await Jimp.read(pathFile);
  //   await file
  //     .autocrop()
  //     .cover(
  //       250,
  //       250,
  //       Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
  //     )
  //     .writeAsync(pathFile);
  // }

  async saveAvatarToCloud({ pathFile, userIdImg }) {
    // await this.transformAvatar(pathFile);
    // const folderUserAvatar = path.join(this.AVATARS_OF_USERS, idUser);
    // await createFolderIsNotExist(folderUserAvatar);
    // await fs.rename(pathFile, path.join(folderUserAvatar, name));
    // await this.deleteOldAvatar(
    //   path.join(process.cwd(), this.AVATARS_OF_USERS, oldFile)
    // );
    // const avatarUrl = path.normalize(path.join(idUser, name));
    // console.log(idUser);
    // console.log(pathFile);
    // return avatarUrl;
  }

  async deleteTemporaryFile(pathFile) {
    try {
      await fs.unlink(pathFile);
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = Upload;
