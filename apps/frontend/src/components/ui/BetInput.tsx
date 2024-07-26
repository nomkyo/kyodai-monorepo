import type React from "react";
import { NumberInput } from "@mantine/core";

export const LineInput = (x:number | undefined, disabled:boolean): React.ReactElement => {
    return (
        <NumberInput
        step={0.5}
        decimalScale={1}
        label={"Line"}
        size="lg"
        defaultValue={x}
        disabled={disabled}
        prefix={x?.prefix()}
    ></NumberInput>
    )
}
export const BidInput = (): React.ReactElement => {
    return (
        <NumberInput
        allowNegative={false}
        allowDecimal={false}
        thousandSeparator=","
        step={25}
        label={"Bid"}
        size="lg"
        defaultValue={0}
    ></NumberInput>
    )
}