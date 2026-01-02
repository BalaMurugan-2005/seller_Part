import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ImageUploader = () => {
  const [images, setImages] = useState([
    'https://via.placeholder.com/200',
    'https://via.placeholder.com/200',
    'https://via.placeholder.com/200',
  ]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    // In a real app, you would upload to cloud storage
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages].slice(0, 8)); // Max 8 images
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSetPrimary = (index) => {
    const newImages = [...images];
    const primaryImage = newImages.splice(index, 1)[0];
    newImages.unshift(primaryImage);
    setImages(newImages);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Upload up to 8 images. First image will be used as the main product image.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square rounded-lg overflow-hidden border border-gray-300">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-lg">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {index === 0 ? (
                  <span className="inline-block w-full py-1 text-xs text-center bg-green-600 text-white rounded">
                    Primary
                  </span>
                ) : (
                  <button
                    onClick={() => handleSetPrimary(index)}
                    className="w-full py-1 text-xs bg-gray-800 text-white rounded hover:bg-gray-900"
                  >
                    Set as Primary
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {images.length < 8 && (
          <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center justify-center">
            <Upload className="text-gray-400 mb-2" size={24} />
            <span className="text-sm text-gray-600">Upload Image</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start">
          <ImageIcon className="text-blue-500 mt-0.5 mr-3" size={18} />
          <div>
            <p className="text-sm text-blue-800 font-medium">Image Guidelines</p>
            <ul className="text-xs text-blue-600 mt-1 list-disc list-inside">
              <li>Use high-quality images (min. 1000x1000px)</li>
              <li>White background recommended</li>
              <li>Show product from multiple angles</li>
              <li>Include lifestyle/usage images</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;