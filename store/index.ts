import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import sessionsReducer from "./slices/sessionsSlice";
import authReducer from "./slices/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createTransform } from "redux-persist";
import { encryptData, decryptData } from "../utils/encryption";

const encryptionTransform = createTransform(
  (inboundState) => encryptData(inboundState),
  (outboundState) => decryptData(outboundState)
);

const authPersistConfig = {
  key: "auth",
  storage,
  transforms: [encryptionTransform],
};

const sessionsPersistConfig = {
  key: "sessions",
  storage,
  transforms: [encryptionTransform],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedSessionsReducer = persistReducer(sessionsPersistConfig, sessionsReducer);

const store = configureStore({
  reducer: {
    theme: themeReducer,
    sessions: persistedSessionsReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/PAUSE",
        ],
      },
    }),
});

const persistor = persistStore(store);

export default store;
export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;