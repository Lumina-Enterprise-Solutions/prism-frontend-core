import type { EventColor } from "../types/event-calendar-view-types";
import { colorOptions } from "./constant/color-options";

export function getColorClasses(color?: EventColor) {
    const option = colorOptions.find((opt) => opt.value === color);
    if (!option) return 'bg-card border-muted-foreground/20';
    return `${option.bgClass} border ${option.borderClass}`;
  }