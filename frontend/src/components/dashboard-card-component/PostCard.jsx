
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Edit2, MapPin, Calendar, ImageIcon } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';

export default function PostCard({ item, onEdit }) {
    const images = item.images || [];

    return (
        <div
            className="
                mt-4
                ml-7!
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-200/70
                bg-linear-to-br
                from-white
                via-slate-50
                to-blue-50/70
                shadow-md
                hover:shadow-2xl!
                hover:border-blue-300/60
                transition-all
                duration-500
                flex
                flex-col
                group
                
            "
        >
            {/* Glow Overlay */}
            <div
                className="
                    absolute
                    inset-0
                    bg-linear-to-br
                    from-blue-500/5
                    via-transparent
                    to-violet-500/5
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                    pointer-events-none
                    z-0
                "
            />

            {/* Decorative Blur */}
            <div
                className="
                    absolute
                    -top-20
                    -right-20
                    h-40
                    w-40
                    rounded-full
                    bg-blue-300/10
                    blur-3xl
                    pointer-events-none
                "
            />

            {/* Image Section */}
            <div className="w-full h-60 bg-slate-50 relative overflow-hidden border-b border-slate-100 z-10">
                {images.length > 0 ? (
                    <Swiper
                        modules={[Pagination]}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        className="w-full h-full"
                    >
                        {images.map((img, idx) => (
                            <SwiperSlide
                                key={img.public_id || idx}
                                className="w-full h-full"
                            >
                                <img
                                    src={img.url}
                                    alt={`${item.itemName}-${idx + 1}`}
                                    className="
                                        w-full
                                        h-full
                                        object-contain
                                        transition-transform
                                        duration-700
                                        ease-out
                                        group-hover:scale-105
                                    "
                                    loading="lazy"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
                        <ImageIcon
                            size={36}
                            className="stroke-[1.5]"
                        />
                        <span className="text-sm font-medium">
                            No Images Uploaded
                        </span>
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-5 left-5 z-20">
                    <span
                        className={`px-3.5! py-1.5! text-xs font-bold tracking-wider uppercase rounded-xl shadow-lg ${
                            item.status === 'lost'
                                ? 'bg-rose-500 text-white'
                                : 'bg-emerald-500 text-white'
                        }`}
                    >
                        {item.status}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6! sm:p-7 flex flex-col grow justify-between z-10">
                <div className="mb-6">
                    {/* Title */}
                    <h3
                        className="
                            text-xl
                            sm:text-2xl
                            font-extrabold
                            leading-snug
                            line-clamp-1
                            mb-3
                            bg-linear-to-r
                            from-slate-800
                            via-blue-700
                            to-violet-700
                            bg-clip-text
                            text-transparent
                            group-hover:from-blue-700
                            group-hover:via-violet-700
                            group-hover:to-pink-600
                            transition-all
                            duration-500
                        "
                    >
                        {item.itemName}
                    </h3>

                    {/* Description */}
                    <p
                        className="
                            text-slate-600
                            text-[15px]
                            leading-relaxed
                            line-clamp-2
                            font-medium
                        "
                    >
                        {item.description ||
                            'No description provided for this item.'}
                    </p>
                </div>

                {/* Footer */}
                <div
                    className="
                        space-y-5
                        pt-5
                        border-t
                        border-slate-200/70
                        group-hover:border-blue-200
                        transition-colors
                    "
                >
                    <div className="flex flex-col gap-3 text-sm">
                        {/* Location */}
                        <div className="flex items-center">
                            <MapPin
                                size={18}
                                className="
                                    mr-3
                                    shrink-0
                                    text-blue-500
                                    stroke-[1.8]
                                "
                            />
                            <span className="truncate text-slate-700 font-semibold">
                                {item.location}
                            </span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center">
                            <Calendar
                                size={18}
                                className="
                                    mr-3
                                    shrink-0
                                    text-violet-500
                                    stroke-[1.8]
                                "
                            />
                            <span className="text-slate-500 font-medium">
                                {item.date
                                    ? new Date(item.date).toLocaleDateString(
                                          undefined,
                                          {
                                              month: 'long',
                                              day: 'numeric',
                                              year: 'numeric',
                                          }
                                      )
                                    : 'N/A'}
                            </span>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        onClick={() => onEdit(item)}
                        className="
                            w-full
                            mt-2
                            flex
                            items-center
                            justify-center
                            gap-2
                            py-3
                            rounded-2xl!
                            text-sm
                            font-semibold
                            text-white
                            bg-linear-to-r
                            from-blue-600
                            via-violet-600
                            to-purple-700
                            hover:from-blue-700
                            hover:via-violet-700
                            hover:to-purple-800
                            shadow-lg
                            hover:shadow-blue-500/30
                            transition-all
                            duration-300
                        "
                    >
                        <Edit2
                            size={16}
                            className="stroke-[2.5]"
                        />
                        Edit Post Settings
                    </button>
                </div>
            </div>
        </div>
    );
}