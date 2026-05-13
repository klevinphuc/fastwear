import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { lookbooks } from "@/lib/catalog";

export function LookbookTab() {
  const [open, setOpen] = useState<number | null>(null);
  const active = lookbooks.find((l) => l.id === open);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 md:px-6">
      <div className="glass-strong p-6 md:p-10">
        <div className="mb-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B1A33]">L'OFFICIEL × FASTWEAR</div>
          <h1 className="mt-1 font-serif text-4xl italic text-[#1C1410] md:text-6xl">Lookbook Editorial</h1>
          <p className="mt-3 max-w-xl text-[#1C1410]/65">Bộ sưu tập biên tập theo phong cách tạp chí — cảm hứng từ catwalk và đường phố.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {lookbooks.map((lb) => (
            <button
              key={lb.id}
              onClick={() => setOpen(lb.id)}
              className="glass-mid glass-card-hover group relative block overflow-hidden text-left"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <motion.img
                  src={lb.coverImage}
                  alt={lb.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute left-5 top-5">
                <span className="glass-dark px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/90" style={{ borderRadius: 999 }}>
                  L'OFFICIEL × FASTWear
                </span>
              </div>
              <div className="absolute inset-x-5 bottom-5 text-white">
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] opacity-80">{lb.subtitle}</div>
                <h3 className="mt-2 font-serif text-3xl italic md:text-5xl">{lb.title}</h3>
                <p className="mt-2 max-w-md text-sm opacity-85">{lb.theme}</p>
                <div className="mt-4 flex items-center gap-2 font-mono text-[11px]">
                  <span>{lb.items} items</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="mx-auto my-10 max-w-6xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glass-strong overflow-hidden">
                <button onClick={() => setOpen(null)} className="absolute right-6 top-6 z-10 glass-soft flex h-10 w-10 items-center justify-center text-[#1C1410]">
                  <X className="h-4 w-4" />
                </button>
                <div className="relative h-[55vh] overflow-hidden">
                  <img src={active.coverImage} alt={active.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-8 bottom-8 text-white">
                    <div className="font-mono text-[11px] uppercase tracking-[0.3em]">{active.subtitle}</div>
                    <h2 className="mt-2 font-serif text-5xl italic md:text-7xl">{active.title}</h2>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 p-6 md:grid-cols-4">
                  {Array.from({ length: active.items }).map((_, i) => (
                    <div key={i} className="glass-mid aspect-[4/5] overflow-hidden">
                      <img src={`${active.coverImage}&v=${i}`} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/30 p-6 text-center">
                  <button className="rounded-full bg-[#6B1A33] px-8 py-3 text-sm text-white hover:bg-[#8B2442]">
                    Thuê look này
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
