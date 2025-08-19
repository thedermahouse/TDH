"use client";
import Image from "next/image";

export default function BeforeAfterProgression({ section }) {
  const { heading, description, items = [] } = section || {};

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl lg:text-4xl font-primary font-normal mb-4">{heading}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">{description}</p>

        {/* Progression Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Image */}
              {item.imageURL && (
                <div className="w-full  aspect-[4/3] relative">
                  <Image
                    src={item.imageURL}
                    alt={item.title || `Step ${idx + 1}`}
                    fill
                    className="object-cover  rounded-lg shadow-lg"
                  />
                </div>
              )}
              {/* Title */}
              <h3 className="text-lg font-medium mt-4">{item.title}</h3>
              {/* Content */}
              <p className="text-gray-500 text-sm mt-2">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
