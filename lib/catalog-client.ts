"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/data/products";
import type { Category } from "@/lib/data/categories";

type Catalog = { products: Product[]; categories: Category[] };

// Modül düzeyinde önbellek — birden çok bileşen tek istek paylaşır.
let cache: Promise<Catalog> | null = null;

export function fetchCatalog(): Promise<Catalog> {
  if (!cache) {
    cache = fetch("/api/catalog")
      .then((r) => (r.ok ? r.json() : { products: [], categories: [] }))
      .catch(() => ({ products: [], categories: [] }));
  }
  return cache;
}

export function useCatalog() {
  const [data, setData] = useState<Catalog>({ products: [], categories: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchCatalog().then((c) => {
      if (active) {
        setData(c);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return { products: data.products, categories: data.categories, loading };
}
