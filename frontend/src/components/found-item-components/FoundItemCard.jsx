import React from "react";
// Import Swiper React components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const fallbackImage =
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop";

const formatDate = (dateValue) => {
    if (!dateValue) return "Recently found";
    return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(dateValue));
};

const FoundItemCard = ({ item ,  openChat }) => {
    const {
        itemName,
        category,
        images = [],
        description,
        LocationFound,
        createdAt,
        status = "Found",
    } = item;

    return (
        <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100">
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-emerald-400 via-cyan-400 to-sky-500 opacity-80 z-10" />

            {/* SWIPER CAROUSEL CONTAINER */}
            <div className="relative h-56 overflow-hidden bg-slate-100">
                <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                    <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-emerald-950/20">
                        {status}
                    </span>
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                        {category}
                    </span>
                </div>

                <Swiper
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    navigation={true}
                    className="h-full w-full"
                >
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <SwiperSlide key={image.public_id || index}>
                                <img
                                    src={image.url}
                                    alt={`${itemName} - view ${index + 1}`}
                                    className="h-full w-full object-contain"
                                />
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <img
                                src={fallbackImage}
                                alt="No image available"
                                className="h-full w-full object-contain"
                            />
                        </SwiperSlide>
                    )}
                </Swiper>
                
                {/* Optional: Keep a dark gradient at the bottom for aesthetic blending */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/40 to-transparent opacity-80" />
            </div>

            {/* DETAILS SECTION (Unchanged) */}
            <div className="space-y-4 p-5">
                <div>
                    <p className="text-sm font-medium text-emerald-600">
                        Found on {formatDate(createdAt)}
                    </p>
                    <h3 className="mt-1 line-clamp-1 text-xl font-bold text-slate-950">
                        {itemName}
                    </h3>
                </div>

                <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                    {description}
                </p>

                <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-700 transition-colors duration-300 group-hover:bg-emerald-50">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-emerald-600 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                    </span>
                    <div>
                        <p className="font-semibold text-slate-900">Location Found</p>
                        <p className="line-clamp-2">{LocationFound}</p>
                    </div>
                </div>

                <button
                    type="button"
                     onClick={() => openChat(item._id)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200"
                >
                    View Details
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </button>
            </div>
        </article>
    );
};

export default FoundItemCard;