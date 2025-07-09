export default function getBlob(dataURL) {
    return new Promise((resolve, reject) => {
      const arr = dataURL.split(",");
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      resolve(Buffer.from(u8arr, "utf-8"));
    });
  }
  