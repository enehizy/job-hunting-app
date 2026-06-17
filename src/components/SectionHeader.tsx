import { View, Text } from "react-native";

export default function SectionHeader({ title }: { title: string }) {
  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>{title}</Text>
    </View>
  );
}
