export async function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

export function base64ToFile(base64: string): File {
  const [metadata, data] = base64.split(',');
  const mime = metadata.match(/:(.*?);/)?.[1] || '';
  const byteString = atob(data);
  const arrayBuffer = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    arrayBuffer[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([arrayBuffer], { type: mime });
  return new File([blob], 'image.' + mime.split('/')[1], { type: mime });
}