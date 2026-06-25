import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CommonProps = {
  className?: string;
  children: React.ReactNode;
  /** Append the broadsheet → arrow glyph after the label. */
  withArrow?: boolean;
};

type AnchorProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** The single filled action on the site — Voltage fill, green-glow shadow. */
export function VoltageButton({ className, children, withArrow = true, ...rest }: AnchorProps) {
  return (
    <a className={cn("btn-voltage", className)} {...rest}>
      {children}
      {withArrow && <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />}
    </a>
  );
}

/** Secondary navigation / inline action — no background, underline on hover. */
export function GhostButton({ className, children, withArrow = false, ...rest }: AnchorProps) {
  return (
    <a className={cn("btn-ghost", className)} {...rest}>
      {children}
      {withArrow && <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />}
    </a>
  );
}
