export const getFileType = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    if (extension) {
      if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(extension)) {
        return 'image';
      }
      if (['mp3', 'wav', 'ogg', 'aac', 'flac'].includes(extension)) {
        return 'audio';
      }
    }
    return 'other';
  };