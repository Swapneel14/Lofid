import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "LoFid" });

//to save user data to a data base

const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    triggers: [{ event: "clerk/user.created" }],
  },
  async ({ event }) => {
    try {
      const {
        id,
        first_name,
        last_name,
        email_addresses,
        image_url,
      } = event.data;

      const userData = {
        _id: id,
        email: email_addresses?.[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        image: image_url,
      };

      console.log(userData);
    } catch (err) {
      console.error(err);
    }
  }
);

//delete user from database

const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
    triggers: [{ event: "clerk/user.deleted" }],
  },
  async ({ event }) => {
    try {
      const {
        id,
        first_name,
        last_name,
        email_addresses,
        image_url,
      } = event.data;

      const userData = {
        _id: id,
        email: email_addresses?.[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        image: image_url,
      };

      console.log(userData);
    } catch (err) {
      console.error(err);
    }
  }
);

export const functions = [syncUserCreation,syncUserDeletion];