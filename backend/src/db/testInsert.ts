import mongoose from "mongoose";
import { User } from "../models/User";
import dotenv from "dotenv";
import { connectDB } from "./connect";

dotenv.config();

async function runTest() {
  try {
    /* =========================
       CONNECT TO MONGODB
    ========================= */
    await connectDB();

    console.log("Connected to MongoDB");

    /* =========================
       CREATE TEST USER
    ========================= */

    const user = await User.create({
      email: "alex@example.com",
      password: "a".repeat(64), // matches your min length requirement
      money: 500,
      sprite: "Black",

      layer0: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => null)
      ),

      layer1: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => null)
      ),

      layer2: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => null)
      ),

      inventory: {
        "Brown Chair": 2,
        "Green Chair": 1,
        "Table": 3,
        "Pot Plant": 1
      },

      tasks: [
        {
          id: "t1",
          name: "Feed cat",
          type: "Daily",
          amount: 5
        },
        {
          id: "t2",
          name: "Clean room",
          type: "Weekly",
          amount: 25,
          dayOfWk: 1,
          deadline: new Date("2026-05-24T13:29:43.871Z")
        },
        {
          id: "t3",
          name: "Finish project",
          type: "Custom",
          amount: 40,
          difficulty: "Hard",
          deadline: new Date("2026-05-25T10:00:00.000Z")
        }
      ],

      debtStartDate: null
    });

    console.log("✅ User inserted successfully");
    console.log("Inserted User ID:", user._id);

    /* =========================
       FETCH USER BACK
    ========================= */

    const fetchedUser = await User.findOne({
      email: "alex@example.com"
    });

    console.log("\n✅ Fetched user from DB:");
    console.log(JSON.stringify(fetchedUser, null, 2));

    /* =========================
       CLEAN UP (OPTIONAL)
    ========================= */

    // await UserModel.deleteMany({ email: "alex@example.com" });
    // console.log("🧹 Test data cleaned up");

  } catch (err) {
    console.error("Error during test:");
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

runTest();