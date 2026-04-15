import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

export default function Shop() {
  const topRef = useRef(null);
  const sectionRef = useRef(null);
  const sidebarWrapRef = useRef(null);
  const sidebarInnerRef = useRef(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [sort, setSort] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sidebarMode, setSidebarMode] = useState("top"); // top | fixed | bottom

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Failed to load recipes. Please try again

  useEffect(() => {
    let raf = 0;
    const topOffset = 112; // matches pt-28 / header spacing
    const bottomGap = 32;

    const isDesktop = () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(min-width: 1024px)").matches; // tailwind lg

    const measure = () => {
      if (!isDesktop()) {
        if (sidebarMode !== "top") setSidebarMode("top");
        return;
      }
      const sectionEl = sectionRef.current;
      const wrapEl = sidebarWrapRef.current;
      const innerEl = sidebarInnerRef.current;
      if (!sectionEl || !wrapEl || !innerEl) return;

      const sectionRect = sectionEl.getBoundingClientRect();
      const innerHeight = innerEl.offsetHeight;

      // Not yet reached the section's top
      if (sectionRect.top >= topOffset) {
        if (sidebarMode !== "top") setSidebarMode("top");
        return;
      }

      // Reached the section bottom (pin inside section)
      const sectionBottomLimit = topOffset + innerHeight + bottomGap;
      if (sectionRect.bottom <= sectionBottomLimit) {
        if (sidebarMode !== "bottom") setSidebarMode("bottom");
        return;
      }

      // Normal fixed while inside section
      if (sidebarMode !== "fixed") setSidebarMode("fixed");
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    measure();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch enough items for a nice shop grid (dummyjson supports limit/skip)
        const res = await axios.get("https://dummyjson.com/recipes?limit=48", {
          signal: controller.signal,
        });
        setRecipes(Array.isArray(res.data?.recipes) ? res.data.recipes : []);
      } catch {
        // setError("Failed to load recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
    return () => {
      controller.abort();
    };
  }, []);

  const cuisines = useMemo(() => {
    const set = new Set();
    for (const r of recipes) {
      if (r?.cuisine) set.add(r.cuisine);
    }
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [recipes]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = recipes.filter((r) => {
      const matchesCuisine = cuisine === "All" ? true : r?.cuisine === cuisine;
      const matchesQuery = !q
        ? true
        : `${r?.name ?? ""} ${r?.cuisine ?? ""} ${(r?.tags ?? []).join(" ")}`
            .toLowerCase()
            .includes(q);
      return matchesCuisine && matchesQuery;
    });

    if (sort === "rating") {
      list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sort === "calories") {
      list = [...list].sort(
        (a, b) => (a.caloriesPerServing ?? 0) - (b.caloriesPerServing ?? 0)
      );
    } else if (sort === "name") {
      list = [...list].sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
    }

    return list;
  }, [recipes, cuisine, query, sort]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#fafaf9] pt-28 pb-28"
    >
      <div ref={topRef} />
      {/* Decorative background */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-orange-200/40 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-slate-200/50 blur-[140px]" />

      {/* Mobile: floating filter button */}
      <button
        type="button"
        onClick={() => setMobileFiltersOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 h-14 w-14 rounded-2xl bg-slate-900 text-white shadow-2xl shadow-slate-300 active:scale-95 transition-transform"
        aria-label="Open filters"
      >
        <i className="fas fa-sliders-h text-lg" />
      </button>

      {/* Mobile: slide-in filters drawer */}
      <AnimatePresence>
        {mobileFiltersOpen ? (
          <>
            <Motion.div
              className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
            />
            <Motion.aside
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-[86%] max-w-[380px] bg-white shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              role="dialog"
              aria-modal="true"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <p className="text-slate-900 font-black tracking-tight text-lg">Filters</p>
                <button
                  type="button"
                  className="h-10 w-10 rounded-2xl bg-slate-50 text-slate-700 hover:bg-slate-100"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
              <div className="p-5 overflow-auto h-[calc(100vh-72px)]">
                <FiltersPanel
                  loading={loading}
                  resultCount={filtered.length}
                  cuisines={cuisines}
                  query={query}
                  setQuery={setQuery}
                  cuisine={cuisine}
                  setCuisine={(v) => {
                    setCuisine(v);
                    scrollToTop();
                  }}
                  sort={sort}
                  setSort={(v) => {
                    setSort(v);
                    scrollToTop();
                  }}
                  onReset={() => {
                    setQuery("");
                    setCuisine("All");
                    setSort("featured");
                    setMobileFiltersOpen(false);
                    scrollToTop();
                  }}
                />
              </div>
            </Motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      <div className="pt-32 px-6 lg:px-20 relative z-10">
        <div className="lg:grid lg:grid-cols-[360px_1fr] xl:grid-cols-[380px_1fr] lg:gap-10">
          {/* Desktop: fixed inside shop section (no footer overlap) */}
          {/* Desktop: fixed inside shop section */}
<aside
  ref={sidebarWrapRef}
  className="hidden lg:block relative"
>
  {/* The spacer div now takes the exact width of the column to prevent layout shifts */}
  <div
    ref={sidebarInnerRef}
    className={[
      "rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur-md p-5 shadow-sm max-h-[calc(100vh-9rem)] overflow-y-auto custom-scrollbar transition-all duration-300",
      sidebarMode === "fixed"
        ? "fixed top-28 z-30"
        : sidebarMode === "bottom"
          ? "absolute bottom-0 w-full"
          : "relative w-full",
    ].join(" ")}
    style={
      sidebarMode === "fixed"
        ? {
            // Match the exact width and horizontal position of the parent 'aside'
            width: sidebarWrapRef.current?.offsetWidth + "px",
            left: sidebarWrapRef.current?.getBoundingClientRect().left + "px",
          }
        : {}
    }
  >
    <FiltersPanel
      loading={loading}
      resultCount={filtered.length}
      cuisines={cuisines}
      query={query}
      setQuery={setQuery}
      cuisine={cuisine}
      setCuisine={(v) => {
        setCuisine(v);
        scrollToTop();
      }}
      sort={sort}
      setSort={(v) => {
        setSort(v);
        scrollToTop();
      }}
      onReset={() => {
        setQuery("");
        setCuisine("All");
        setSort("featured");
        scrollToTop();
      }}
    />
  </div>
</aside>

          {/* Main content */}
          <div>
            {/* Header */}
            <div className="max-w-2xl">
              <Motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-4"
              >
                <span className="h-[2px] w-12 bg-orange-500" />
                <span className="text-orange-600 font-black uppercase tracking-[0.35em] text-xs">
                  Shop recipes
                </span>
              </Motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 leading-[0.92]">
                Pick your next <span className="text-orange-500">craving</span>.
              </h1>
              <p className="mt-5 text-slate-500 font-medium max-w-xl leading-relaxed">
                Browse recipes from the DummyJSON API. Filter by cuisine, search by name, and sort by rating.
              </p>
            </div>

            {/* Quick info row (mobile friendly) */}
            <div className="mt-8 flex items-center justify-between">
              <p className="text-sm font-bold text-slate-600">
                {loading ? "Loading..." : `${filtered.length} items`}
              </p>
              <div className="lg:hidden text-xs font-black uppercase tracking-widest text-slate-400">
                Tap filter button
              </div>
            </div>

            {/* Content */}
            <div className="mt-10">
              {error ? (
                <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700 font-semibold">
                  {error}
                </div>
              ) : null}

              {loading ? (
                <ShopSkeleton />
              ) : (
                <AnimatePresence mode="popLayout">
                  <Motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 lg:gap-10"
                  >
                    {filtered.map((item, idx) => (
                      <ShopCard key={item.id} item={item} index={idx} />
                    ))}
                  </Motion.div>
                </AnimatePresence>
              )}

              {!loading && !error && filtered.length === 0 ? (
                <div className="mt-12 text-center">
                  <p className="text-slate-900 font-black text-2xl">No results</p>
                  <p className="mt-2 text-slate-500 font-medium">
                    Try a different search or change the cuisine.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FiltersPanel({
  loading,
  resultCount,
  cuisines,
  query,
  setQuery,
  cuisine,
  setCuisine,
  sort,
  setSort,
  onReset,
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-slate-900 font-black tracking-tight text-xl">Search</p>
          <p className="mt-1 text-slate-500 font-medium text-sm">
            {loading ? "Loading..." : `${resultCount} items`}
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="h-10 rounded-2xl px-4 text-xs font-black uppercase tracking-widest text-slate-700 hover:text-orange-600 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3">
        <label className="block">
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
            Search
          </span>
          <div className="mt-2 relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pizza, pasta, spicy..."
              className="w-full h-12 rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <i className="fas fa-search" />
            </span>
          </div>
        </label>

        <label className="block">
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
            Cuisine
          </span>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="mt-2 w-full h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
          >
            {cuisines.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
            Sort
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="mt-2 w-full h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
          >
            <option value="featured">Featured</option>
            <option value="rating">Rating (high → low)</option>
            <option value="calories">Calories (low → high)</option>
            <option value="name">Name (A → Z)</option>
          </select>
        </label>
      </div>

      <div className="mt-6 rounded-3xl bg-slate-50 border border-slate-100 p-4">
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
          Tip
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-700 leading-relaxed">
          Search supports name, cuisine, and tags.
        </p>
      </div>
    </div>
  );
}

function ShopCard({ item, index }) {
  const price = (Number(item?.id ?? 0) + 15.99).toFixed(2);
  const rating = Number(item?.rating ?? 0);
  const handleAddToCart = () => {
    toast.success(`${item?.name ?? "Item"} added to cart`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  return (
    <Motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.25) }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-orange-200/30">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
              {item.cuisine}
            </span>
            {Array.isArray(item.tags) && item.tags[0] ? (
              <span className="hidden sm:inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-slate-700 shadow-sm">
                {item.tags[0]}
              </span>
            ) : null}
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-2 text-sm font-bold text-slate-900 shadow-sm">
            <span className="text-orange-500">★</span>
            <span>{rating.toFixed(1)}</span>
            <span className="text-slate-400 font-medium">/ 5</span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-black text-slate-900 tracking-tight line-clamp-1 group-hover:text-orange-600 transition-colors">
            {item.name}
          </h3>

          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Calories
              </p>
              <p className="mt-1 font-bold text-slate-900">
                {item.caloriesPerServing} kcal
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Time
              </p>
              <p className="mt-1 font-bold text-slate-900">{item.cookTimeMinutes} min</p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Price
              </p>
              <p className="mt-1 text-2xl font-black text-slate-900">${price}</p>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-6 text-sm font-black text-white transition-colors hover:bg-orange-500 active:scale-[0.98]"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Motion.article>
  );
}

function ShopSkeleton() {
  const items = Array.from({ length: 9 }, (_, i) => i);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 lg:gap-10">
      {items.map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white"
        >
          <div className="aspect-[4/3] w-full bg-slate-100 animate-pulse" />
          <div className="p-6">
            <div className="h-5 w-2/3 bg-slate-100 rounded-xl animate-pulse" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="h-16 rounded-2xl bg-slate-100 animate-pulse" />
              <div className="h-16 rounded-2xl bg-slate-100 animate-pulse" />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div className="h-10 w-24 rounded-2xl bg-slate-100 animate-pulse" />
              <div className="h-12 w-32 rounded-2xl bg-slate-100 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
