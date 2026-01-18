'use client';

import React from 'react'
import { useState } from 'react';

const ImageGallery = (props) => {

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    return (
        <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
            <img
                src={props.resort.images[selectedImageIndex]}
                alt={`${props.resort.name} - Image ${selectedImageIndex + 1}`}
                className="w-full h-[350px] object-cover"
            />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-5 gap-3">
            {props.resort.images.map((image, index) => (
                <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`rounded-md overflow-hidden border-2 transition-all ${
                        props.selectedImageIndex === index
                        ? "border-blue-600 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-16 object-cover"
                />
                </button>
            ))}
            </div>
        </div>
    )
}

export default ImageGallery