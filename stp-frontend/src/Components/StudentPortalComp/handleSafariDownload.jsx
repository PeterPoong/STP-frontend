import React from 'react';

const generateSafariCompatibleImage = async (targetRef, selectedDesign) => {
  try {
    if (!targetRef.current) return null;

    // Create offscreen canvas with fixed dimensions
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match target element
    const elementRect = targetRef.current.getBoundingClientRect();
    canvas.width = elementRect.width * 2; // Double for better quality
    canvas.height = elementRect.height * 2;
    
    // Fill background
    ctx.fillStyle = selectedDesign === 0 ? '#BA1718' : '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Pre-load all images with proper CORS settings
    const images = Array.from(targetRef.current.getElementsByTagName('img'));
    await Promise.all(images.map(async (img) => {
      return new Promise((resolve, reject) => {
        const newImg = new Image();
        newImg.crossOrigin = 'anonymous';
        
        newImg.onload = () => {
          // Draw image maintaining aspect ratio
          const aspectRatio = newImg.width / newImg.height;
          const targetWidth = img.offsetWidth * 2;
          const targetHeight = targetWidth / aspectRatio;
          
          const x = img.offsetLeft * 2;
          const y = img.offsetTop * 2;
          
          ctx.drawImage(newImg, x, y, targetWidth, targetHeight);
          resolve();
        };
        
        newImg.onerror = () => {
          console.error('Failed to load image:', img.src);
          resolve(); // Resolve anyway to continue with other images
        };

        // Handle data URLs and regular URLs
        if (img.src.startsWith('data:')) {
          newImg.src = img.src;
        } else {
          // Add cache-busting parameter for regular URLs
          const cacheBuster = `?t=${Date.now()}`;
          newImg.src = `${img.src}${cacheBuster}`;
        }
      });
    }));

    // Draw text content
    ctx.font = '24px Arial';
    ctx.fillStyle = selectedDesign === 0 ? '#FFFFFF' : '#000000';
    // Add text drawing logic here...

    // Convert to blob with explicit type and quality
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png', 1.0);
    });
  } catch (error) {
    console.error('Safari image generation error:', error);
    return null;
  }
};

const handleSafariDownload = async (targetRef, selectedDesign, username) => {
  try {
    const blob = await generateSafariCompatibleImage(targetRef, selectedDesign);
    if (!blob) {
      console.error('Failed to generate image');
      return;
    }

    // For iOS Safari
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      const reader = new FileReader();
      reader.onload = () => {
        const link = document.createElement('a');
        link.href = reader.result;
        link.download = `RIASEC-Result-${username}-Design${selectedDesign + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      reader.readAsDataURL(blob);
    } else {
      // For other browsers
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `RIASEC-Result-${username}-Design${selectedDesign + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Download error:', error);
  }
};

export default handleSafariDownload;