import React, { useEffect, useState } from "react";
import FoundItemCard from "../found-item-components/FoundItemCard";
import ChatRoom from "./ChatRoom";
import { useUser, SignInButton } from "@clerk/react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FoundItems = () => {
  const { user } = useUser();
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const api = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const res = await fetch(
          `${api}/api/item/get-all-found-items?search=${search}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch found items");
        }

        const data = await res.json();
        setFoundItems(data.foundItems || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoundItems();
  }, [search]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="bg-white rounded-4xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-3xl">
              🔒
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Login Required</h2>

          <p className="text-slate-600 mt-3">
            Please sign in to view found items and participate in chats.
          </p>

          <SignInButton mode="modal">
            <button className="btn btn-primary btn-lg mt-2">
              Login
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50">
        <p className="text-slate-600 font-medium">Loading found items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
            Found Items
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Browse items reported as found and check the location details.
          </p>
        </div>

        {foundItems.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {foundItems.map((item) => (
              <FoundItemCard
                key={item._id}
                item={item}
                openChat={setSelectedRoom}
              />
            ))}
          </div>
        ) : (
          <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                No found items yet
              </h2>
              <p className="mt-2 text-slate-600">
                Found items will appear here once they are added.
              </p>
            </div>
          </div>
        )}
      </section>

      {selectedRoom && (
        <ChatRoom roomId={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </main>
  );
};

export default FoundItems;
