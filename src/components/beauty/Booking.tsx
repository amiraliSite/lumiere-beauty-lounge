"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BadgeCheck, CalendarCheck, Loader2, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Reveal, SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";
import { motion } from "framer-motion";

interface BookingFormValues {
  name: string;
  phone: string;
  email?: string;
  service: string;
  date: string;
  time: string;
  message?: string;
}

/**
 * Static builds (GitHub Pages) have no backend — bookings are stored
 * client-side in localStorage instead of the API.
 */
const IS_STATIC = process.env.NEXT_PUBLIC_STATIC === "1";
const LOCAL_BOOKINGS_KEY = "lumiere-local-bookings";

function readLocalBookings(): Record<string, unknown>[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_BOOKINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalBooking(values: Record<string, unknown>) {
  const list = readLocalBookings();
  list.push({ ...values, createdAt: new Date().toISOString() });
  try {
    window.localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(list));
  } catch {
    /* storage full — ignore */
  }
}

function sameMonthCount(list: Record<string, unknown>[]): number {
  const now = new Date();
  return list.filter((item) => {
    const created = typeof item.createdAt === "string" ? new Date(item.createdAt) : null;
    return !!created && created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;
}

export default function Booking() {
  const { t, locale } = useLanguage();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [monthCount, setMonthCount] = useState<number | null>(null);

  useEffect(() => {
    if (IS_STATIC) {
      setMonthCount(sameMonthCount(readLocalBookings()));
      return;
    }
    fetch("/api/bookings")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.count === "number") setMonthCount(d.count);
      })
      .catch(() => {});
  }, []);

  const schema = z.object({
    name: z.string().min(2),
    phone: z.string().min(7),
    email: z.string().email().optional().or(z.literal("")),
    service: z.string().min(1),
    date: z.string().min(1),
    time: z.string().min(1),
    message: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", service: "", date: "", time: "", message: "" },
  });

  const serviceValue = watch("service");
  const timeValue = watch("time");
  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (values: BookingFormValues) => {
    setSubmitting(true);
    try {
      if (IS_STATIC) {
        saveLocalBooking({ ...values, lang: locale });
        setMonthCount(sameMonthCount(readLocalBookings()));
      } else {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, lang: locale }),
        });
        if (!res.ok) throw new Error("request failed");
        const data = await res.json();
        if (typeof data.count === "number") setMonthCount(data.count);
      }
      toast({ title: t.booking.success, variant: "default" });
      reset();
    } catch {
      toast({ title: t.booking.error, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="relative w-full overflow-hidden border-y border-primary/20 py-20 lg:py-32">
      <div className="absolute inset-0 bg-accent-gradient opacity-[0.08]" />
      <div className="pointer-events-none absolute -top-20 end-[-6rem] h-72 w-72 rounded-full bg-primary/15 blur-3xl animate-blob" />
      <div className="relative grid w-full items-start gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-10">
        {/* Left copy */}
        <div className="flex flex-col gap-8">
          <SectionHeading
            badge={t.booking.kicker}
            title={t.booking.title}
            subtitle={t.booking.subtitle}
            align="start"
          />
          <div className="flex flex-col gap-3">
            {t.booking.perks.map((perk, i) => (
              <Reveal key={perk} delay={0.2 + i * 0.08}>
                <div className="flex items-center gap-3 rounded-xl glass-card px-4 py-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-gradient text-primary-foreground">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold">{perk}</span>
                </div>
              </Reveal>
            ))}
          </div>
          {monthCount !== null && (
            <Reveal delay={0.4}>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                {monthCount}+ {t.booking.monthCount}
              </div>
            </Reveal>
          )}
        </div>

        {/* Form */}
        <Reveal delay={0.15}>
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl glass-card p-6 shadow-soft-lg sm:p-8"
            whileHover={{ y: -2 }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="bk-name">{t.booking.name}</Label>
                <Input id="bk-name" placeholder={t.booking.namePh} {...register("name")} />
                {errors.name && <span className="text-xs text-destructive">{t.booking.namePh}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="bk-phone">{t.booking.phone}</Label>
                <Input id="bk-phone" dir="ltr" placeholder={t.booking.phonePh} {...register("phone")} />
                {errors.phone && <span className="text-xs text-destructive">{t.booking.phonePh}</span>}
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="bk-email">{t.booking.email}</Label>
                <Input id="bk-email" dir="ltr" type="email" placeholder={t.booking.emailPh} {...register("email")} />
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="bk-service">{t.booking.service}</Label>
                <Select onValueChange={(v) => setValue("service", v)} value={serviceValue}>
                  <SelectTrigger id="bk-service" className="w-full">
                    <SelectValue placeholder={t.booking.servicePh} />
                  </SelectTrigger>
                  <SelectContent>
                    {t.booking.serviceOptions.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service && <span className="text-xs text-destructive">{t.booking.servicePh}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="bk-date">{t.booking.date}</Label>
                <Input id="bk-date" type="date" min={today} {...register("date")} />
                {errors.date && <span className="text-xs text-destructive">*</span>}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="bk-time">{t.booking.time}</Label>
                <Select onValueChange={(v) => setValue("time", v)} value={timeValue}>
                  <SelectTrigger id="bk-time" className="w-full">
                    <SelectValue placeholder={t.booking.timePh} />
                  </SelectTrigger>
                  <SelectContent>
                    {t.booking.timeOptions.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.time && <span className="text-xs text-destructive">{t.booking.timePh}</span>}
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="bk-message">{t.booking.message}</Label>
                <Textarea id="bk-message" rows={3} placeholder={t.booking.messagePh} {...register("message")} />
              </div>
            </div>

            <Button type="submit" disabled={submitting} className="mt-7 w-full gap-2 rounded-full py-6 text-base shadow-glow">
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {t.booking.submitting}
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  {t.booking.submit}
                </>
              )}
            </Button>
            {IS_STATIC && <p className="mt-4 text-center text-xs text-muted-foreground">{t.booking.localNote}</p>}
          </motion.form>
        </Reveal>
      </div>

      {/* decorative */}
      <div className="pointer-events-none absolute -bottom-10 start-[-4rem] select-none">
        <CalendarCheck className="h-48 w-48 text-primary/5" />
      </div>
    </section>
  );
}
