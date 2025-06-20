export type SewingLineStatus = "Excess" | "Standard" | "Low" | "Timeout"
export type GarmentType = 'BRA' | 'BRIEF' | 'SHIRT' | 'PANTS' | 'DRESS' | 'OTHER';

export interface SewingLinePlan {
    contractNumber: string
    styleNumber: string
    styleName: string
    buyer: string
    startTime: string
    endTime: string
    targetPerHour: number
    totalTarget: number
}

export interface SewingLine {
    id: string
    name: string
    status: SewingLineStatus
    bunCount: number
    pacCount: number
    targetCount: number
    lastActivity: string
    efficiency: number
    type: GarmentType
    plan: SewingLinePlan
}

export interface BoardData {
    id: string
    name: string
    description: string
    sewingLines: SewingLine[]
    createdAt?: string
    updatedAt?: string
}

export interface BoardStats {
    excess: number
    standard: number
    low: number
    timeout: number
}

export interface BoardSummary {
    id: string
    name: string
    description: string
    lineCount: number
    createdAt: string
    updatedAt?: string
    stats: BoardStats
}