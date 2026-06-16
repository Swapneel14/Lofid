
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth, useUser } from '@clerk/react';
// import { motion } from 'framer-motion';
// import { Search, Layers, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
// import PostCard from '../dashboard-card-component/PostCard';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
//   const { user } = useUser();

//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserItems = async () => {
//       if (!user?.id) return;
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(`http://localhost:6769/api/item/get-all-items/${user.id}`);
//         const result = await response.json();

//         if (result.success) {
//           setItems(result.data);
//         } else {
//           setError(result.message || "Failed to sync posts.");
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Could not safely connect to database endpoints.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (isSignedIn) fetchUserItems();
//   }, [isSignedIn, user]);

//   const handleEdit = (item) => {
//     const route = item.status === 'lost' ? '/report-lost' : '/report-found';
//     navigate(`${route}?itemId=${item._id}`);
//   };

//   if (!isAuthLoaded) {
//     return (
//       <div className="p-10 flex items-center justify-center min-h-[60vh]">
//         <div className="text-slate-400 font-medium text-sm animate-pulse tracking-wide">
//           Syncing security tokens...
//         </div>
//       </div>
//     );
//   }

//   if (!isSignedIn) {
//     return (
//       <div className="flex h-[80vh] items-center justify-center px-4">
//         <div className="max-w-md w-full text-center p-8 bg-white rounded-2xl shadow-xl shadow-slate-100/50 border border-slate-100">
//           <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-blue-100/50">
//             <Search size={26} className="stroke-2" />
//           </div>
//           <h2 className="text-xl font-bold text-slate-800 mb-2">Sign in to view items</h2>
//           <p className="text-slate-500 text-sm leading-relaxed mb-6">
//             Please log in to register, manage, and edit active campus tracking records.
//           </p>
//           <button 
//             onClick={() => navigate('/sign-in')}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-200"
//           >
//             Sign In Now
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Calculate metrics for the stats section
//   const totalPosts = items.length;
//   const lostCount = items.filter(item => item.status === 'lost').length;
//   const foundCount = items.filter(item => item.status === 'found').length;

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen bg-slate-50/30">

//       {/* 1. Personalized Hero Banner */}
//       <div className="relative bg-linear-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-10 mb-8 overflow-hidden shadow-lg shadow-blue-900/10 border border-blue-500/20 text-white">
//         {/* Abstract background shapes */}
//         <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-10 pointer-events-none">
//           <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
//             <path fill="#FFFFFF" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.6,-46.3C91.4,-33.5,98,-18,97.1,-2.9C96.2,12.2,87.8,26.8,77.7,39.3C67.6,51.8,55.8,62.2,42.4,70.1C29,78,-6,83.4,-19.6,79.8C-33.2,76.2,-48.5,63.6,-59.8,50.1C-71.1,36.6,-78.4,22.2,-82.1,6.8C-85.8,-8.6,-85.9,-25,-78.7,-38.3C-71.5,-51.6,-57,-61.8,-42.6,-68.9C-28.2,-76,-14.1,-80,0.8,-81.3C15.7,-82.6,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
//           </svg>
//         </div>

//         <div className="relative z-10">
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wide uppercase mb-4 backdrop-blur-sm">
//             <TrendingUp size={14} /> Dashboard Overview
//           </div>
//           <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
//             Welcome back, {user?.firstName || 'Student'}! 👋
//           </h1>
//           <p className="text-blue-100 text-sm sm:text-base max-w-xl leading-relaxed">
//             Here is your personal command center. Track, update, and manage all your reported items across campus in one place.
//           </p>
//         </div>
//       </div>

//       {/* 2. Quick Stats Overview Row */}
//       {!loading && !error && (
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
//           <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
//             <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
//               <Layers size={22} className="stroke-[2.5]" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-slate-500">Total Reports</p>
//               <h3 className="text-2xl font-bold text-slate-800">{totalPosts}</h3>
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
//             <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
//               <AlertCircle size={22} className="stroke-[2.5]" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-slate-500">Items Lost</p>
//               <h3 className="text-2xl font-bold text-slate-800">{lostCount}</h3>
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
//             <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
//               <CheckCircle2 size={22} className="stroke-[2.5]" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-slate-500">Items Found</p>
//               <h3 className="text-2xl font-bold text-slate-800">{foundCount}</h3>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Section Divider */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
//       </div>

//       {/* Loading Skeleton Elements */}
//       {loading && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[1, 2, 3].map((n) => (
//             <div key={n} className="bg-white border border-slate-100 h-96 rounded-2xl animate-pulse shadow-sm" />
//           ))}
//         </div>
//       )}

//       {/* Error Alert Display Box */}
//       {error && (
//         <div className="bg-rose-50/60 border border-rose-100 text-rose-700 px-5 py-4 rounded-xl text-sm font-medium text-center max-w-lg mx-auto my-12 shadow-sm">
//           {error}
//         </div>
//       )}

//       {/* Empty Database State View */}
//       {!loading && !error && items.length === 0 && (
//         <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 max-w-xl mx-auto shadow-sm px-6">
//           <p className="text-slate-400 font-medium text-sm">
//             You haven't submitted any lost or found items yet.
//           </p>
//         </div>
//       )}

//       {/* Structured Clean Item Post Grid */}
//       {!loading && !error && items.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {items.map((item) => (
//             <PostCard 
//               key={item._id} 
//               item={item} 
//               onEdit={handleEdit} 
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/react';
import { motion } from 'framer-motion';
import { Search, Layers, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import PostCard from '../dashboard-card-component/PostCard';

export default function Dashboard() {
    const navigate = useNavigate();
    const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
    const { user } = useUser();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserItems = async () => {
            if (!user?.id) return;
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:6769/api/item/get-all-items/${user.id}`);
                const result = await response.json();

                if (result.success) {
                    setItems(result.data);
                } else {
                    setError(result.message || "Failed to sync posts.");
                }
            } catch (err) {
                console.error(err);
                setError("Could not safely connect to database endpoints.");
            } finally {
                setLoading(false);
            }
        };

        if (isSignedIn) fetchUserItems();
    }, [isSignedIn, user]);

    const handleEdit = (item) => {
        const route = item.status === 'lost' ? '/report-lost' : '/report-found';
        navigate(`${route}?itemId=${item._id}`);
    };

    if (!isAuthLoaded) {
        return (
            <div className="p-12 flex items-center justify-center min-h-[60vh]">
                <div className="text-slate-400 font-medium text-base animate-pulse tracking-wide">
                    Syncing security tokens...
                </div>
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="flex h-[80vh] items-center justify-center px-6">
                <div className="max-w-md w-full text-center p-10 bg-white rounded-3xl shadow-xl shadow-slate-100/50 border border-slate-100">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100/50">
                        <Search size={30} className="stroke-2" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">Sign in to view items</h2>
                    <p className="text-slate-500 text-base leading-relaxed mb-8">
                        Please log in to register, manage, and edit active campus tracking records.
                    </p>
                    <button
                        onClick={() => navigate('/sign-in')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base py-4 px-6 rounded-xl transition-all shadow-md shadow-blue-200"
                    >
                        Sign In Now
                    </button>
                </div>
            </div>
        );
    }

    // Calculate metrics for the stats section
    const totalPosts = items.length;
    const lostCount = items.filter(item => item.status === 'lost').length;
    const foundCount = items.filter(item => item.status === 'found').length;

    return (
        <div className="max-w-360 mx-auto px-6 sm:px-10 py-12 min-h-screen bg-slate-50/40">

            {/* 1. Personalized Hero Banner (More Padding, Larger text) */}
            <div className="relative bg-linear-to-r from-blue-600 to-indigo-700 rounded-4xl p-10 sm:p-14 mb-12 overflow-hidden shadow-xl shadow-blue-900/10 border border-blue-500/20 text-white">
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-10 pointer-events-none">
                    <svg width="500" height="500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFFFFF" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.6,-46.3C91.4,-33.5,98,-18,97.1,-2.9C96.2,12.2,87.8,26.8,77.7,39.3C67.6,51.8,55.8,62.2,42.4,70.1C29,78,-6,83.4,-19.6,79.8C-33.2,76.2,-48.5,63.6,-59.8,50.1C-71.1,36.6,-78.4,22.2,-82.1,6.8C-85.8,-8.6,-85.9,-25,-78.7,-38.3C-71.5,-51.6,-57,-61.8,-42.6,-68.9C-28.2,-76,-14.1,-80,0.8,-81.3C15.7,-82.6,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>
                </div>

                <div className="relative z-10 px-3 ">
                    <div className="inline-flex mx-2 mt-2 items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold tracking-wider uppercase mb-6 backdrop-blur-sm shadow-sm">
                        <TrendingUp size={16} /> Dashboard Overview
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                        Welcome back, {user?.firstName || 'Student'}! 👋
                    </h1>
                    <p className="text-blue-100 text-base sm:text-lg max-w-2xl leading-relaxed">
                        Here is your personal command center. Track, update, and manage all your reported items across campus in one place.
                    </p>
                </div>
            </div>

            {/* 2. Quick Stats Overview Row (Increased Gap & Padding) */}
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-14 mt-10!">
                    <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6 transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <Layers size={28} className="stroke-2" />
                        </div>
                        <div>
                            <p className="text-base font-semibold text-slate-500 mb-1">Total Reports</p>
                            <h3 className="text-4xl font-black text-slate-800">{totalPosts}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6 transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
                        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                            <AlertCircle size={28} className="stroke-2" />
                        </div>
                        <div>
                            <p className="text-base font-semibold text-slate-500 mb-1">Items Lost</p>
                            <h3 className="text-4xl font-black text-slate-800">{lostCount}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6 transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                            <CheckCircle2 size={28} className="stroke-2" />
                        </div>
                        <div>
                            <p className="text-base font-semibold text-slate-500 mb-1">Items Found</p>
                            <h3 className="text-4xl font-black text-slate-800">{foundCount}</h3>
                        </div>
                    </div>
                </div>
            )}

            {/* Section Divider (Larger text & more bottom margin) */}
            {/* <h2 className="text-2xl! font-extrabold! tracking-tight! m-2! 
  bg-linear-to-r! from-blue-400! to-blue-900!
  bg-clip-text! text-transparent! 
  drop-shadow-md!">
                Recent Activity
            </h2> */}



            <div className="m-7! animate-[floatBubble_4s_ease-in-out_infinite] relative inline-flex items-center justify-center px-8! py-2! rounded-full overflow-hidden group">

                {/* Animated Bubble Background */}
                <div
                    className="
            absolute inset-0
            rounded-full
            bg-[linear-gradient(120deg,#60a5fa,#8b5cf6,#06b6d4,#3b82f6)]
            bg-[length:300%_300%]
            animate-[gradientMove_8s_ease_infinite]
        "
                />

                {/* Floating Bubble Highlights */}
                <div className="absolute w-12 h-12 rounded-full bg-white/20 blur-md top-1 left-6 animate-pulse" />
                <div className="absolute w-8 h-8 rounded-full bg-white/15 blur-sm bottom-1 right-8 animate-pulse delay-700" />
                <div className="absolute w-5 h-5 rounded-full bg-white/20 blur-sm top-3 right-20 animate-pulse delay-1000" />

                {/* Glass Layer */}
                <div
                    className="
            absolute inset-0
            rounded-full
            backdrop-blur-xl
            bg-white/10
            border border-white/20
        "
                />

                <h2
                    className="
            relative z-10
            text-2xl
            font-extrabold
            tracking-tight
            bg-gradient-to-r
            from-white
            via-blue-100
            to-white
            bg-clip-text
            text-transparent
            drop-shadow-lg
        "
                >
                    Recent Activity
                </h2>
            </div>





            {/* Loading Skeleton Elements (Wider gaps) */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="bg-white border border-slate-100 h-450px rounded-3xl animate-pulse shadow-sm" />
                    ))}
                </div>
            )}

            {/* Error Alert Display Box */}
            {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-5 rounded-2xl text-base font-semibold text-center max-w-2xl mx-auto my-16 shadow-sm">
                    {error}
                </div>
            )}

            {/* Empty Database State View */}
            {!loading && !error && items.length === 0 && (
                <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 max-w-2xl mx-auto shadow-sm px-8">
                    <Layers size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium text-lg">
                        You haven't submitted any lost or found items yet.
                    </p>
                </div>
            )}

            {/* Structured Clean Item Post Grid (Increased gap-8 for spaciousness) */}
            {!loading && !error && items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {items.map((item) => (
                        <PostCard
                            key={item._id}
                            item={item}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}