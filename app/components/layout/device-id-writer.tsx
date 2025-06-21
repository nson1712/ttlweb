"use client";

import { getOrCreateDeviceId } from "@/app/lib/utils";
import { LSK_DEVICE_ID } from "@/app/utils/storage";
import { useEffect } from "react";


export default function DeviceIdWriter() {
  useEffect(() => {
    const deviceId = getOrCreateDeviceId();
    document.cookie = `${LSK_DEVICE_ID}=${deviceId}; Path=/; Max-Age=${60 * 60 * 24 * 365}`;
  }, []);

  return null;
}