import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CalendarClock, ExternalLink } from "lucide-react";
import { BOOKING, isCalConfigured } from "../landing/constants";

/**
 * Cal.com booking embed. When `BOOKING.calLink` is still the placeholder we
 * render a clearly-labeled setup notice instead of a broken iframe.
 */
export function BookDemo({ theme }: { theme: "light" | "dark" }) {
  useEffect(() => {
    if (!isCalConfigured) return;
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme,
        styles: { branding: { brandColor: BOOKING.brandColor } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [theme]);

  if (!isCalConfigured) {
    return (
      <div className="rounded-[14px] border border-mist bg-pollen/25 p-8 text-center dark:border-bark dark:bg-bark/50">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-[10px] bg-voltage text-obsidian-ink">
          <CalendarClock size={22} aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-twk-lausanne text-[20px] font-[400] text-obsidian-ink dark:text-linen">
          Booking is one step from live
        </h3>
        <p className="mx-auto mt-3 max-w-[42ch] font-twk-lausanne text-[15px] font-[350] leading-relaxed text-obsidian-ink/75 dark:text-linen/75">
          Set your real Cal.com event link in{" "}
          <code className="font-times text-[14px] not-italic">BOOKING.calLink</code> (in{" "}
          <code className="font-times text-[14px] not-italic">src/landing/constants.ts</code>) and
          this turns into a live{" "}
          <span className="text-obsidian-ink dark:text-linen">{BOOKING.durationLabel}</span> booking
          calendar.
        </p>
        <p className="mt-4 font-times text-[13px] italic text-sage dark:text-moss-glow">
          Current value: "{BOOKING.calLink}" — placeholder.
        </p>
        <a
          href="https://cal.com"
          target="_blank"
          rel="noreferrer noopener"
          className="btn-ghost mt-5 justify-center"
        >
          Get a Cal.com link <ExternalLink size={15} aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[14px] border border-mist dark:border-bark">
      <Cal
        calLink={BOOKING.calLink}
        style={{ width: "100%", height: "640px", overflow: "scroll" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
