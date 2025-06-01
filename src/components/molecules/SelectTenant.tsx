import { motion } from "framer-motion";
import { Card } from "../atoms/Card";
import { Label } from "../atoms/Label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type TenantType = {
    label: string,
    value: string,
}

const TenantId: TenantType[] = [
    {
        label: 'Default',
        value: 'default'
    },
    {
        label: 'Acme',
        value: 'acme'
    },
    {
        label: 'Beta',
        value: 'beta'
    }
]

export default function SelectTenant() {
    return (
        <div className="grid gap-2 justify-center items-center">
            <RadioGroup className="grid grid-cols-3">
                {TenantId.map((tenant) => (
                    <div className="flex flex-col items-center space-y-2">
                        <motion.div whileHover={{ y: 3, scale: 1.1 }} transition={{ type: "spring", stiffness: 200, damping: 10 }}>
                            <Card key={tenant.value} className="w-[100px] bg-secondary dark:bg-card">
                                <div className="flex items-center justify-center py-6 px-4">
                                    <Label className="font-bold text-accent-foreground">{tenant.label}</Label>
                                </div>
                            </Card>
                        </motion.div>
                        <RadioGroupItem value={tenant.value} />
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}