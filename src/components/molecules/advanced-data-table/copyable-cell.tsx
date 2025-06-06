import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { Check, Clipboard } from "lucide-react";

export default function CopyableCell({ value }: { value: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="font-medium cursor-pointer">
                    {value}
                </TooltipTrigger>
                <TooltipContent
                    onClick={handleCopy}
                    className="cursor-pointer font-medium flex items-center flex-row gap-2"
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4 text-green-500" />
                            <p>Copied!</p>
                        </>
                    ) : (
                        <>
                            <Clipboard className="w-4 h-4 text-gray-500" />
                            <p>Click to copy</p>
                        </>
                    )}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
