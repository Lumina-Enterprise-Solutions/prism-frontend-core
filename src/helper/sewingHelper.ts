import { clsx, type ClassValue } from "clsx"
import type { SewingLine, SewingLineStatus } from "../types/kanban-types"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function determineStatus(
    bunCount: number,
    targetCount: number,
    lastActivity: string,
    excessThreshold = 110,
    lowThreshold = 90,
    timeoutMinutes = 30,
): SewingLineStatus {
    // Check for timeout first
    const lastActivityDate = new Date(lastActivity)
    const now = new Date()
    const diffMs = now.getTime() - lastActivityDate.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))

    if (diffMinutes >= timeoutMinutes) {
        return "Timeout"
    }

    // Calculate percentage of target
    const percentage = (bunCount / targetCount) * 100

    if (percentage >= excessThreshold) {
        return "Excess"
    } else if (percentage < lowThreshold) {
        return "Low"
    } else {
        return "Standard"
    }
}

export function updateSewingLineStatus(
    sewingLine: SewingLine,
    excessThreshold = 110,
    lowThreshold = 90,
    timeoutMinutes = 30,
): SewingLine {
    const newStatus = determineStatus(
        sewingLine.bunCount,
        sewingLine.targetCount,
        sewingLine.lastActivity,
        excessThreshold,
        lowThreshold,
        timeoutMinutes,
    )

    return {
        ...sewingLine,
        status: newStatus,
    }
}