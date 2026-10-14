/**
 * Utility to safely store data in localStorage and compress uploaded images
 * to avoid QuotaExceededError (typically 5MB limit).
 */

export function safeLocalStorageSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err: unknown) {
    console.warn(`localStorage quota exceeded for key "${key}". Attempting cleanup or graceful degradation.`, err);
    try {
      // If quota exceeded, remove obsolete large keys or fallback gracefully
      return false;
    } catch {
      return false;
    }
  }
}

/**
 * Compresses an image file (e.g. from file upload) using an HTML5 Canvas,
 * scaling it down to a max dimension (e.g. 1000px) and JPEG quality (0.75).
 * This typically shrinks a 5MB+ image down to ~50-100KB, preventing QuotaExceededError.
 */
export function compressImageFile(file: File, maxWidth = 1000, maxHeight = 1000, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    // If it's not an image, reject
    if (!file.type.startsWith('image/')) {
      reject(new Error('File is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (readerEvent) => {
      const src = readerEvent.target?.result as string;
      if (!src) {
        reject(new Error('Image data is empty'));
        return;
      }

      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image in DOM'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to original src if canvas fails
          resolve(src);
          return;
        }

        // Draw image into canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to compressed jpeg data URL
        try {
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch {
          resolve(src);
        }
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  });
}
