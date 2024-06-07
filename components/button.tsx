import { TouchableOpacity, Text } from "react-native";

type ButtonProps = {
    type: "primary" | "secondary" | "plain" | "black" | "borderless";
    size: "sm" | "md" | "lg" | "fit" | "circle";
    text: string;
    textType: "bold" | "normal"
    corners: "rounded" | "squared"
    onPress: () => void;
};

const Button = ({ type, size, text, textType, corners, onPress }: ButtonProps) => {
    const backgroundColour = type === "primary" ? "bg-blue-500" : type === "secondary" ? "bg-gray-300" : type === "black" ? "bg-black" : "bg-white";
    const textColour = type === "primary" ? "text-white" : type === "borderless" ? "text-gray-500" : type === "black" ? "text-white" : "text-black";
    const fontWeight = textType === "bold" ? "font-bold" : "font-normal";
    const width = size === "sm" ? "w-1/4" : size === "md" ? "w-1/2" : size === "lg" ? "w-3/4" : size === "fit" ? "w-fit" : "w-10" ;
    const height = size === "sm" ? "h-10" : size === "md" ? "h-10" : size === "lg" ? "h-10": size === "fit" ? "h-fit": "h-10";
    const borderColour = type === "borderless" ? "border-transparent" : "border-black";
    const corner = corners === "rounded" ? "rounded-full" : "rounded";
    const padding = size === "fit" ? "" : "p-2";

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`${padding} m-1 border ${borderColour} ${corner} flex justify-center items-center ${backgroundColour} ${width} ${height}`}
        >
            <Text className={`text-base ${fontWeight} ${textColour}`}>{text}</Text>
        </TouchableOpacity>
    );
};

export default Button;