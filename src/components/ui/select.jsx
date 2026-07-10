import ReactSelect from "react-select"

import { NEO_BORDER, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

// Thin wrapper around react-select (https://react-select.com), standardized
// so every dropdown in the app gets search-as-you-type for free instead of
// each page hand-rolling its own Select/SelectItem markup. Callers work with
// a plain `value`/`onChange(value)` pair (not react-select's {value, label}
// option object) — the value/option-object translation happens in here.
function Select({
  className,
  value,
  onChange,
  options,
  isInvalid,
  isClearable = false,
  isSearchable = true,
  ...props
}) {
  const selectedOption = options?.find((option) => option.value === value) ?? null

  return (
    <ReactSelect
      unstyled
      value={selectedOption}
      onChange={(option) => onChange?.(option?.value ?? null)}
      options={options}
      isClearable={isClearable}
      isSearchable={isSearchable}
      menuPortalTarget={typeof document !== "undefined" ? document.body : undefined}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 60 }) }}
      classNames={{
        container: () => cn("w-full", className),
        control: (state) =>
          cn(
            "flex min-h-12 items-center rounded-lg bg-white px-2 text-base transition-colors dark:bg-neutral-900",
            NEO_BORDER,
            isInvalid && "border-destructive",
            state.isFocused && "ring-3 ring-ring/30"
          ),
        placeholder: () => "text-muted-foreground px-1",
        input: () => "px-1",
        singleValue: () => "px-1",
        valueContainer: () => "gap-1",
        indicatorSeparator: () => "hidden",
        dropdownIndicator: () => "text-muted-foreground px-1",
        clearIndicator: () => "text-muted-foreground px-1",
        menu: () =>
          cn(
            "mt-1 overflow-hidden rounded-lg bg-white p-1 dark:bg-neutral-900",
            NEO_BORDER,
            NEO_SHADOW
          ),
        menuList: () => "flex flex-col gap-0.5",
        option: (state) =>
          cn(
            "cursor-pointer rounded-md px-3 py-2.5 text-sm",
            state.isFocused && "bg-eko-primary text-white",
            state.isSelected && !state.isFocused && "bg-eko-primary/10 font-semibold"
          ),
        noOptionsMessage: () => "text-muted-foreground px-3 py-2 text-sm",
      }}
      {...props}
    />
  )
}

export { Select }
