"use client";

import { getOrCreateDeviceId } from "@/app/lib/utils";
import { useEffect } from "react";// your LS helper

export default function DeviceIdSync() {
  useEffect(() => {
    const deviceId = getOrCreateDeviceId();
    
    fetch("/api/device-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceId }),
    }).catch(console.error);
  }, []);

  return null;
}