import type { User } from "../api/api";
import { DUMMY_LAYERS } from "./MapTypes";

export const DEFAULT_USER: User = {
  id: "loading",
  email: "",
  money: 0,
  sprite: "default_player",
  layers: {
    layer0: [[null]],
    layer1: [[null]],
    layer2: [[null]],
  },
  inventory: {},
  tasks: [],
  debtStartDate: null,
};

// export const DEFAULT_USER: User = {
//   id: "u1",
//   email: "alex@example.com",
//   money: 500,
//   sprite: "orange",

//   layers: DUMMY_LAYERS,

//   inventory: {},

//   tasks: [
//     {
//       id: 1,
//       type: "Daily",
//       name: "Feed cat",
//       amount: 5,
//     },
//     {
//       id: 2,
//       type: "Weekly",
//       name: "Clean room",
//       amount: 25,
//       dayOfWk: 1,
//       deadline: new Date("2026-05-24T13:29:43.871Z"),
//     },
//     {
//       id: 3,
//       type: "Custom",
//       name: "Finish project",
//       amount: 40,
//       difficulty: "Hard",
//       deadline: new Date("2026-05-25T10:00:00.000Z"),
//     },
//   ],

//   debtStartDate: null,
// };
