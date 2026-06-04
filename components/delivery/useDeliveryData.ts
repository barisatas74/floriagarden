"use client";

import { useEffect, useState } from "react";
import { seedDelivery } from "@/lib/admin/seed";
import { loadAdminData } from "@/lib/admin/store";

/**
 * Teslimat bölgeleri ve sürecini demo store'dan okur.
 * İlk render seed varsayılanıyla (sunucu+istemci aynı → hidrasyon uyumlu),
 * mount sonrası localStorage'daki admin düzenlemeleriyle güncellenir.
 */
export function useDeliveryData() {
  const [state, setState] = useState(() => seedDelivery());

  useEffect(() => {
    const d = loadAdminData();
    setState({
      deliveryZones: d.deliveryZones,
      deliveryProcess: d.deliveryProcess,
    });
  }, []);

  return state;
}
