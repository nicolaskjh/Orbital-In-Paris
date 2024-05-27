import { TouchableOpacity, Text } from "react-native";

type ButtonProps = {
    type: "primary" | "secondary" | "plain" | "borderless";
    size: "sm" | "md" | "lg" | "fit";
    text: string;
    textType: "bold" | "normal"
    corners: "rounded" | "squared"
    onPress: () => void;
};

const Button = ({ type, size, text, textType, corners, onPress }: ButtonProps) => {
    const backgroundColour = type === "primary" ? "bg-blue-500" : type === "secondary" ? "bg-gray-300" : "bg-transparent";
    const textColour = type === "primary" ? "text-white" : type === "borderless" ? "text-grey" : "text-black";
    const fontWeight = textType === "bold" ? "font-bold" : "font-normal";
    const width = size === "sm" ? "w-1/4" : size === "md" ? "w-1/2" : size === "lg" ? "w-3/4" : "w-fit";
    const height = size === "sm" ? "h-10" : size === "md" ? "h-10" : size === "lg" ? "h-10": "h-fit";
    const borderColour = type === "borderless" ? "border-transparent" : "border-black";
    const corner = corners === "rounded" ? "rounded-full" : "rounded";

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`p-2 border ${borderColour} ${corner} flex justify-center items-center ${backgroundColour} ${width} ${height}`}
        >
            <Text className={`text-base ${fontWeight} ${textColour}`}>{text}</Text>
        </TouchableOpacity>
    );
};

export default Button;