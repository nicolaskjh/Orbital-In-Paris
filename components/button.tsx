import { TouchableOpacity, Text } from "react-native";

type ButtonProps = {
    type: "plain" | "black" | "borderless";
    size: "sm" | "md" | "lg" | "fit" | "fitPadding" | "circle";
    text: string;
    textType: "bold" | "normal"
    fontSize: "base" | "sm"
    corners: "rounded" | "squared"
    onPress: () => void;
};

const Button = ({ type, size, text, textType, fontSize, corners, onPress }: ButtonProps) => {
    const backgroundColour = type === "black" ? "bg-black" : "bg-white";
    const textColour = type === "borderless" ? "text-gray-500" : type === "black" ? "text-white" : "text-black";

    const fontWeight = textType === "bold" ? "font-bold" : "font-normal";
    const textSize = fontSize === "sm" ? "text-sm" : "text-base";

    const width = size === "sm" ? "w-1/4" : size === "md" ? "w-1/2" : size === "lg" ? "w-3/4" : size === "circle" ? "w-10" : "w-fit";
    const height = size === "sm" ? "h-10" : size === "md" ? "h-10" : size === "lg" ? "h-10": size === "circle" ? "h-10": "h-fit";

    const borderColour = type === "borderless" ? "border-transparent" : "border-black";
    const corner = corners === "rounded" ? "rounded-full" : "rounded";
    const padding = size === "fit" ? "" : "p-2";

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`${padding} m-1 border ${borderColour} ${corner} flex justify-center items-center ${backgroundColour} ${width} ${height}`}
        >
            <Text className={`${textSize} ${fontWeight} ${textColour}`}>{text}</Text>
        </TouchableOpacity>
    );
};

export default Button;