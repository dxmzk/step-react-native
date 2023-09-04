/**
 * Author: Meng
 * Date: 2022-03-03
 * Desc: 
 */

const uploadHost = '';

// 上传多文件
export function uploadImgs(files = []) {
  if (files && files.length > 0) {

    return new Promise((resolve) => {
      Promise.all(files.map((e) => uploadImg(e)))
        .then((array) => {
          let data = { all: false, count: array.length, imgs: [] };
          if (array) {
            array.forEach((e) => {
              if (e.fileUrl) {
                data.imgs.push(e);
              }
            });
            data.all = data.imgs.length == data.count;
          }
          resolve({ code: 0, data });
        })
        .catch((err) => {
          console.log(err);
          resolve({ code: -1003, data: null });
        });
    });
  }
}

// 上传文件
export function uploadImg(file = '') {
  return new Promise((resolve) => {

    let fileName = file.substring(file.lastIndexOf('/') + 1, file.length);

    const body = new FormData();
    body.append('name', 'file');
    body.append('bucket', 'bajanju-p');
    body.append("file", { uri: file, type: 'multipart/form-data', name: 'file' }, fileName);
    // body.append("uploadFile", { uri: file, type: 'multipart/form-data', name: 'uploadFile' }, fileName);
    // body.append("photo", file, fileName);
    // console.log(fileName, file)

    fetch(uploadHost, {
      body,
      method: 'POST',
    }).then((response) => response.json())
      .then((res) => {
        console.log('uploadImg resolve ', res);
        // console.log(res);
        if (res) {
          if (res.success) {
            const info = res.content||{};
            resolve(info);
          } else {
            resolve({ code: info.code, data: null, message: info.msg });
          }
        } else {
          resolve({ code: -1001, data: null });
        }
      }).catch((err) => {
        console.log('uploadImg Error ', err);
        resolve({ code: -1002, data: null });
      });
  });
}
