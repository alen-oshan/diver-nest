'use client';

import React from 'react'
import { useState } from 'react';

const ImageGallery = ({activity}) => {

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    return (
        <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
            <img
                src={activity.images ? activity.images[selectedImageIndex] : ''}
                alt={`${activity.name} - Image ${selectedImageIndex + 1}`}
                className="w-full h-[350px] object-cover"
            />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-5 gap-3">
            {activity.images.map((image, index) => (
                <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`rounded-md overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
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

            {/* Description Section */}
            {activity.description && (
                <div className="mt-6 p-5 bg-white border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About this activity</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{activity.description}</p>
                </div>
            )}
        </div>
    )
}

export default ImageGallery