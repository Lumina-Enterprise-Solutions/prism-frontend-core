import { cn } from "../../utils/utils"


// Shared types
type Spacing = "tight" | "normal" | "wide"
type Thickness = "thin" | "normal" | "thick"
type Color = "primary" | "secondary" | "accent"

// Decorative Dots
interface DecorativeDotsProps {
    className?: string
    count?: number
    direction?: "horizontal" | "vertical"
    spacing?: Spacing
    size?: "small" | "medium" | "large"
    color?: Color
}

export function DecorativeDots({
    className,
    count = 3,
    direction = "horizontal",
    spacing = "normal",
    size = "medium",
    color = "primary",
}: DecorativeDotsProps) {
    const spacingStyles = {
        horizontal: { tight: "space-x-1.5", normal: "space-x-2", wide: "space-x-3" },
        vertical: { tight: "space-y-1.5", normal: "space-y-2", wide: "space-y-3" },
    }

    const sizeStyles = {
        small: "w-1 h-1",
        medium: "w-1.5 h-1.5",
        large: "w-2 h-2",
    }

    const colorStyles = {
        primary: "bg-primary/80",
        secondary: "bg-secondary/80",
        accent: "bg-accent/80",
    }

    return (
        <div
            className={cn(
                "flex",
                direction === "horizontal" ? "flex-row items-center" : "flex-col",
                spacingStyles[direction][spacing],
                className,
            )}
        >
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        "rounded-full",
                        sizeStyles[size],
                        colorStyles[color],
                        "decorative-dot",
                    )}
                />
            ))}
        </div>
    )
}

// Decorative Line
interface DecorativeLineProps {
    className?: string
    orientation?: "horizontal" | "vertical"
    thickness?: Thickness
    length?: string
    dashed?: boolean
    color?: Color
}

export function DecorativeLine({
    className,
    orientation = "horizontal",
    thickness = "normal",
    length = "full",
    dashed = false,
    color = "primary",
}: DecorativeLineProps) {
    const thicknessStyles = {
        thin: "1px",
        normal: "2px",
        thick: "4px",
    }

    const colorStyles = {
        primary: "bg-primary/20",
        secondary: "bg-secondary/20",
        accent: "bg-accent/20",
    }

    return (
        <div
            className={cn(
                colorStyles[color],
                dashed && "border-dashed",
                orientation === "horizontal"
                    ? "h-0 border-t"
                    : "w-0 border-l",
                length !== "full" && (orientation === "horizontal" ? `w-${length}` : `h-${length}`),
                className,
            )}
            style={{
                borderWidth: thicknessStyles[thickness],
            }}
        />
    )
}
// New Component: DecorativeWave
interface DecorativeWaveProps {
    className?: string
    orientation?: "horizontal" | "vertical"
    amplitude?: "small" | "medium" | "large"
    color?: Color
    length?: string
}

export function DecorativeWave({
    className,
    orientation = "horizontal",
    amplitude = "medium",
    color = "primary",
    length = "full",
}: DecorativeWaveProps) {
    const colorStyles = {
        primary: "text-primary/50",
        secondary: "text-secondary/50",
        accent: "text-accent/50",
    }

    const amplitudeStyles = {
        small: "h-2",
        medium: "h-4",
        large: "h-6",
    }

    return (
        <svg
            className={cn(
                colorStyles[color],
                orientation === "horizontal" ? "w-full" : "h-full",
                length !== "full" && (orientation === "horizontal" ? `w-${length}` : `h-${length}`),
                className,
            )}
            preserveAspectRatio="none"
            viewBox="0 0 100 10"
        >
            <path
                d={orientation === "horizontal"
                    ? "M0,5 Q25,0 50,5 T100,5"
                    : "M5,0 Q0,25 5,50 T5,100"}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={amplitudeStyles[amplitude]}
            />
        </svg>
    )
}

// New Component: DecorativeZigzag
interface DecorativeZigzagProps {
    className?: string
    orientation?: "horizontal" | "vertical"
    density?: "low" | "medium" | "high"
    thickness?: Thickness
    color?: Color
}

export function DecorativeZigzag({
    className,
    orientation = "horizontal",
    density = "medium",
    thickness = "normal",
    color = "primary",
}: DecorativeZigzagProps) {
    const colorStyles = {
        primary: "stroke-primary/60",
        secondary: "stroke-secondary/60",
        accent: "stroke-accent/60",
    }

    const thicknessStyles = {
        thin: "1",
        normal: "2",
        thick: "3",
    }

    const densityStyles = {
        low: "10",
        medium: "6",
        high: "4",
    }

    return (
        <svg
            className={cn(
                "w-full h-full",
                colorStyles[color],
                className,
            )}
            preserveAspectRatio="none"
            viewBox={orientation === "horizontal" ? "0 0 100 10" : "0 0 10 100"}
        >
            <path
                d={orientation === "horizontal"
                    ? `M0,5 ${Array.from({ length: 10 }).map((_, i) =>
                        `L${i * 10 + 5},${i % 2 ? 0 : 10}`).join(" ")} L100,5`
                    : `M5,0 ${Array.from({ length: 10 }).map((_, i) =>
                        `L${i % 2 ? 0 : 10},${i * 10 + 5}`).join(" ")} L5,100`}
                fill="none"
                stroke="currentColor"
                strokeWidth={thicknessStyles[thickness]}
                strokeDasharray={densityStyles[density]}
            />
        </svg>
    )
}

// New Component: DecorativeArrow
interface DecorativeArrowProps {
    className?: string
    direction?: "up" | "down" | "left" | "right"
    size?: "small" | "medium" | "large"
    color?: Color
    filled?: boolean
}

export function DecorativeArrow({
    className,
    direction = "right",
    size = "medium",
    color = "primary",
    filled = false,
}: DecorativeArrowProps) {
    const colorStyles = {
        primary: filled ? "fill-primary/80" : "stroke-primary/80",
        secondary: filled ? "fill-secondary/80" : "stroke-secondary/80",
        accent: filled ? "fill-accent/80" : "stroke-accent/80",
    }

    const sizeStyles = {
        small: "w-4 h-4",
        medium: "w-6 h-6",
        large: "w-8 h-8",
    }

    const rotations = {
        right: "0",
        left: "180deg",
        up: "270deg",
        down: "90deg",
    }

    return (
        <svg
            className={cn(sizeStyles[size], colorStyles[color], className)}
            viewBox="0 0 20 20"
            style={{ transform: `rotate(${rotations[direction]})` }}
        >
            <path
                d={filled
                    ? "M2,10 L12,2 L12,7 L18,7 L18,13 L12,13 L12,18 Z"
                    : "M2,10 H18 M12,4 L18,10 L12,16"}
                fill={filled ? "currentColor" : "none"}
                stroke={!filled ? "currentColor" : "none"}
                strokeWidth="2"
            />
        </svg>
    )
}




// New Component: DecorativeBlurCorners
interface DecorativeBlurCornersProps {
    className?: string
    color?: Color
    size?: "small" | "medium" | "large"
    blur?: "light" | "medium" | "heavy"
    position?: "all" | "top" | "bottom" | "left" | "right"
}

export function DecorativeBlurCorners({
    className,
    color = "primary",
    size = "medium",
    blur = "medium",
    position = "all",
}: DecorativeBlurCornersProps) {
    const colorStyles = {
        primary: "bg-primary/20",
        secondary: "bg-secondary/20",
        accent: "bg-accent/20",
    }

    const sizeStyles = {
        small: "w-8 h-8",
        medium: "w-12 h-12",
        large: "w-16 h-16",
    }

    const blurStyles = {
        light: "blur-md",
        medium: "blur-lg",
        heavy: "blur-xl",
    }

    const positionStyles = {
        all: "top-0 left-0 bottom-0 right-0",
        top: "top-0 left-0 right-0",
        bottom: "bottom-0 left-0 right-0",
        left: "top-0 left-0 bottom-0",
        right: "top-0 right-0 bottom-0",
    }

    const cornerClass = cn(
        "absolute rounded-full",
        colorStyles[color],
        sizeStyles[size],
        blurStyles[blur],
    )

    return (
        <div className={cn("absolute inset-0 pointer-events-none", positionStyles[position], className)}>
            {(position === "all" || position === "top" || position === "left") && (
                <div className={cn(cornerClass, "top-0 left-0")} />
            )}
            {(position === "all" || position === "top" || position === "right") && (
                <div className={cn(cornerClass, "top-0 right-0")} />
            )}
            {(position === "all" || position === "bottom" || position === "left") && (
                <div className={cn(cornerClass, "bottom-0 left-0")} />
            )}
            {(position === "all" || position === "bottom" || position === "right") && (
                <div className={cn(cornerClass, "bottom-0 right-0")} />
            )}
        </div>
    )
}

// Fixed Component: DecorativeGradientCorners
interface DecorativeGradientCornersProps {
    className?: string
    color?: Color
    thickness?: Thickness
    gradientDirection?: "to-right" | "to-bottom" | "to-tr" | "to-br"
    opacity?: "low" | "medium" | "high"
}

export function DecorativeGradientCorners({
    className,
    color = "primary",
    thickness = "normal",
    gradientDirection = "to-br",
    opacity = "medium",
}: DecorativeGradientCornersProps) {
    const gradientStyles = {
        primary: `bg-gradient-to-${gradientDirection} from-[var(--primary)]/30 to-transparent`,
        secondary: `bg-gradient-to-${gradientDirection} from-[var(--secondary)]/30 to-transparent`,
        accent: `bg-gradient-to-${gradientDirection} from-[var(--accent)]/30 to-transparent`,
    }

    const thicknessStyles = {
        thin: "w-4 h-4 border-2",
        normal: "w-6 h-6 border-4",
        thick: "w-8 h-8 border-8",
    }

    const opacityStyles = {
        low: "opacity-50",
        medium: "opacity-75",
        high: "opacity-100",
    }

    const cornerClass = cn(
        "absolute border-solid border-t-0 border-l-0",
        gradientStyles[color],
        thicknessStyles[thickness],
        opacityStyles[opacity],
    )

    return (
        <div className={cn("absolute inset-0 pointer-events-none", className)}>
            <span className={cn(cornerClass, "top-0 left-0 rotate-0")} />
            <span className={cn(cornerClass, "top-0 right-0 rotate-90")} />
            <span className={cn(cornerClass, "bottom-0 left-0 rotate-270")} />
            <span className={cn(cornerClass, "bottom-0 right-0 rotate-180")} />
        </div>
    )
}

// Fixed Component: DecorativeGlowCorners
interface DecorativeGlowCornersProps {
    className?: string
    color?: Color
    intensity?: "subtle" | "normal" | "strong"
    size?: "small" | "medium" | "large"
    rounded?: boolean
}

export function DecorativeGlowCorners({
    className,
    color = "primary",
    intensity = "normal",
    size = "medium",
    rounded = true,
}: DecorativeGlowCornersProps) {
    const colorStyles = {
        primary: `[box-shadow:0_0_var(--glow-intensity)_var(--primary)] bg-[var(--primary)]/20`,
        secondary: `[box-shadow:0_0_var(--glow-intensity)_var(--secondary)] bg-[var(--secondary)]/20`,
        accent: `[box-shadow:0_0_var(--glow-intensity)_var(--accent)] bg-[var(--accent)]/20`,
    }

    const intensityStyles = {
        subtle: `[--glow-intensity:8px]`,
        normal: `[--glow-intensity:12px]`,
        strong: `[--glow-intensity:16px]`,
    }

    const sizeStyles = {
        small: "w-4 h-4",
        medium: "w-6 h-6",
        large: "w-8 h-8",
    }

    const cornerClass = cn(
        "absolute",
        colorStyles[color],
        intensityStyles[intensity],
        sizeStyles[size],
        rounded && "rounded-full",
    )

    return (
        <div className={cn("absolute inset-0 pointer-events-none", className)}>
            <span className={cn(cornerClass, "top-0 left-0")} />
            <span className={cn(cornerClass, "top-0 right-0")} />
            <span className={cn(cornerClass, "bottom-0 left-0")} />
            <span className={cn(cornerClass, "bottom-0 right-0")} />
        </div>
    )
}

// New Component: DecorativeNotchedCorners
interface DecorativeNotchedCornersProps {
    className?: string
    color?: Color
    notchSize?: "small" | "medium" | "large"
    depth?: "shallow" | "normal" | "deep"
}

export function DecorativeNotchedCorners({
    className,
    color = "primary",
    notchSize = "medium",
    depth = "normal",
}: DecorativeNotchedCornersProps) {
    const colorStyles = {
        primary: "bg-primary/25",
        secondary: "bg-secondary/25",
        accent: "bg-accent/25",
    }

    const notchSizeStyles = {
        small: "w-3 h-3",
        medium: "w-5 h-5",
        large: "w-7 h-7",
    }

    const depthStyles = {
        shallow: "-m-1",
        normal: "-m-2",
        deep: "-m-3",
    }

    const cornerClass = cn(
        "absolute",
        colorStyles[color],
        notchSizeStyles[notchSize],
        depthStyles[depth],
        "clip-path-polygon-[0_0,100%_0,0_100%]",
    )

    return (
        <div className={cn("absolute inset-0 pointer-events-none", className)}>
            <span className={cn(cornerClass, "top-0 left-0 rotate-0")} />
            <span className={cn(cornerClass, "top-0 right-0 rotate-90")} />
            <span className={cn(cornerClass, "bottom-0 left-0 rotate-270")} />
            <span className={cn(cornerClass, "bottom-0 right-0 rotate-180")} />
        </div>
    )
}

// New Component: DecorativeDivider
interface DecorativeDividerProps {
    className?: string
    pattern?: "dots" | "dashes" | "waves" | "solid"
    thickness?: Thickness
    color?: Color
    width?: string
}

export function DecorativeDivider({
    className,
    pattern = "solid",
    thickness = "normal",
    color = "primary",
    width = "full",
}: DecorativeDividerProps) {
    const colorStyles = {
        primary: "bg-primary/40",
        secondary: "bg-secondary/40",
        accent: "bg-accent/40",
    }

    const thicknessStyles = {
        thin: "h-px",
        normal: "h-0.5",
        thick: "h-1",
    }

    const patternStyles = {
        dots: "bg-[radial-gradient(circle, currentColor 1px, transparent 1px)] bg-[length:4px_4px]",
        dashes: "border-dashed border-t",
        waves: "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgNSI+PHBhdGggZD0iTTAsMi41IFEyNSwwIDUwLDIuNSBUIDEwMCwyLjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]",
        solid: "",
    }

    return (
        <div
            className={cn(
                "w-full",
                colorStyles[color],
                thicknessStyles[thickness],
                patternStyles[pattern],
                width !== "full" && `w-${width}`,
                pattern === "dots" && "h-1 bg-repeat-x",
                className,
            )}
        />
    )
}
// Decorative Corners
interface DecorativeCornersProps {
    className?: string
    color?: Color
    thickness?: Thickness
    rounded?: boolean
    inset?: string | number
    size?: string | number
}

export function DecorativeCorners({
    className,
    color = "primary",
    thickness = "normal",
    rounded = true,
    inset = 0,
    size = 4,
}: DecorativeCornersProps) {
    const colorStyles = {
        primary: "border-primary/30",
        secondary: "border-secondary/30",
        accent: "border-accent/30",
    }

    const thicknessStyles = {
        thin: "border",
        normal: "border-2",
        thick: "border-4",
    }

    const cornerStyles = cn(
        "absolute w-0 h-0",
        rounded && "rounded",
        thicknessStyles[thickness],
        colorStyles[color],
    )

    const insetValue = typeof inset === "number" ? `${inset}px` : inset

    return (
        <div className={cn("absolute inset-0 pointer-events-none", className)}>
            <span
                className={cn(cornerStyles, "top-0 left-0 border-t-0 border-l")}
                style={{ width: size, height: size, inset: insetValue }}
            />
            <span
                className={cn(cornerStyles, "top-0 right-0 border-t-0 border-r")}
                style={{ width: size, height: size, inset: insetValue }}
            />
            <span
                className={cn(cornerStyles, "bottom-0 left-0 border-b border-l-0")}
                style={{ width: size, height: size, inset: insetValue }}
            />
            <span
                className={cn(cornerStyles, "bottom-0 right-0 border-b border-r-0")}
                style={{ width: size, height: size, inset: insetValue }}
            />
        </div>
    )
}

// Decorative Accent
interface DecorativeAccentProps {
    className?: string
    variant?: "dot" | "line" | "circle" | "square" | "diamond"
    color?: Color
    size?: "small" | "medium" | "large"
    rotate?: number
}

export function DecorativeAccent({
    className,
    variant = "dot",
    color = "secondary",
    size = "medium",
    rotate = 0,
}: DecorativeAccentProps) {
    const colorStyles = {
        primary: "bg-primary/90",
        secondary: "bg-secondary/90",
        accent: "bg-accent/90",
    }

    const sizeStyles = {
        small: "scale-75",
        medium: "scale-100",
        large: "scale-125",
    }

    const variantStyles = {
        dot: "h-1.5 w-1.5 rounded-full",
        line: "h-0.5 w-6",
        circle: "h-3 w-3 rounded-full",
        square: "h-2 w-2",
        diamond: "h-2 w-2 rotate-45",
    }

    return (
        <span
            className={cn(
                colorStyles[color],
                variantStyles[variant],
                sizeStyles[size],
                className,
            )}
            style={{ transform: `rotate(${rotate}deg)` }}
        />
    )

}