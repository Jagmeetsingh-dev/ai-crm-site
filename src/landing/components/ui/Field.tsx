import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full rounded-[10px] border bg-linen px-4 py-3 font-twk-lausanne text-[15px] text-obsidian-ink placeholder:text-sage/60 outline-none transition-colors focus:border-voltage focus-visible:outline-none dark:bg-obsidian-ink dark:text-linen dark:placeholder:text-moss-glow/50";

type LabelProps = {
  label: string;
  htmlFor: string;
  optional?: boolean;
  hint?: string;
};

function FieldLabel({ label, htmlFor, optional, hint }: LabelProps) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <label
        htmlFor={htmlFor}
        className="font-twk-lausanne text-[14px] font-[400] text-obsidian-ink dark:text-linen"
      >
        {label}
        {optional && (
          <span className="ml-2 font-times text-[13px] italic text-sage dark:text-moss-glow">
            optional
          </span>
        )}
      </label>
      {hint && <span className="font-times text-[12px] italic text-sage dark:text-moss-glow">{hint}</span>}
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 font-twk-lausanne text-[13px] font-[500] text-obsidian-ink dark:text-linen">
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-voltage align-middle" aria-hidden="true" />
      {message}
    </p>
  );
}

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "email" | "tel" | "url" | "password";
  placeholder?: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  autoComplete?: string;
};

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  optional,
  hint,
  error,
  autoComplete,
}: TextFieldProps) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <FieldLabel label={label} htmlFor={id} optional={optional} hint={hint} />
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        className={cn(inputBase, error ? "border-obsidian-ink dark:border-linen" : "border-mist dark:border-bark")}
      />
      <FieldError id={errId} message={error} />
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder?: string;
  optional?: boolean;
  error?: string;
};

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Select one…",
  optional,
  error,
}: SelectFieldProps) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <FieldLabel label={label} htmlFor={id} optional={optional} />
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          className={cn(
            inputBase,
            "appearance-none pr-11",
            value ? "" : "text-sage/70 dark:text-moss-glow/60",
            error ? "border-obsidian-ink dark:border-linen" : "border-mist dark:border-bark"
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="text-obsidian-ink">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sage dark:text-moss-glow"
        />
      </div>
      <FieldError id={errId} message={error} />
    </div>
  );
}

/** Selectable plan / choice chips (radio-group semantics). */
export function ChoiceChips({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <fieldset>
      <legend className="mb-2 font-twk-lausanne text-[14px] font-[400] text-obsidian-ink dark:text-linen">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt)}
              className={cn(
                "rounded-[10px] border px-4 py-2.5 font-twk-lausanne text-[14px] font-[350] transition-colors",
                active
                  ? "border-voltage bg-voltage text-obsidian-ink"
                  : "border-mist text-obsidian-ink/80 hover:border-obsidian-ink dark:border-bark dark:text-linen/80 dark:hover:border-linen"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
