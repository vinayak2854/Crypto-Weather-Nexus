"use client";

import { Toaster } from "react-hot-toast";

export default function NotificationProvider({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "#4a5568",
            },
          },
          error: {
            duration: 4000,
            theme: {
              primary: "#ef4444",
            },
          },
        }}
      />
    </>
  );
}
