export default function fileToB64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    const fileName = file.name;

    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve({
        name: fileName,
        data: reader.result,
      });
    reader.onerror = (error) => reject(error);
  });
}
