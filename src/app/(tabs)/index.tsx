import ArrowRightIcon from "@/components/ArrowRightIcon";
import BookMarkIcon from "@/components/BookMarkIcon";
import FilterIcon from "@/components/FilterIcon";
import NotificationIcon from "@/components/NotificationIcon";
import SearchIcon from "@/components/SearchIcon";
import SectionHeader from "@/components/SectionHeader";
import TieIcon from "@/components/TieIcon";
import { appThemes, cardColor } from "@/constants/theme";
import { LegendList } from "@legendapp/list/react-native";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const jobCategories = [
  "Technology & IT",
  "Healthcare & Medical",
  "Finance & Accounting",
  "Marketing & Advertising",
  "Sales",
  "Customer Service",
  "Human Resources",
  "Engineering",
  "Education & Training",
  "Legal",
  "Design & Creative",
  "Administrative & Office",
  "Construction & Skilled Trades",
  "Manufacturing & Production",
  "Retail",
  "Hospitality & Tourism",
  "Transportation & Logistics",
  "Real Estate",
  "Media & Communications",
  "Science & Research",
  "Government & Public Sector",
  "Nonprofit & Social Services",
  "Agriculture",
  "Energy & Utilities",
  "Remote Work",
];
const featuredJobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechNova Inc.",
    category: "Technology",
    salaryRange: "$90,000 - $120,000",
  },
  {
    title: "Product Designer",
    company: "Brightline Studios",
    category: "Design",
    salaryRange: "$70,000 - $95,000",
  },
  {
    title: "Backend Engineer (Node.js)",
    company: "CloudForge Systems",
    category: "Technology",
    salaryRange: "$100,000 - $135,000",
  },
  {
    title: "Marketing Manager",
    company: "Pulse Media Group",
    category: "Marketing",
    salaryRange: "$60,000 - $85,000",
  },
  {
    title: "Data Analyst",
    company: "Quantify Labs",
    category: "Data & Analytics",
    salaryRange: "$65,000 - $90,000",
  },
  {
    title: "DevOps Engineer",
    company: "Stackwise Technologies",
    category: "Technology",
    salaryRange: "$95,000 - $130,000",
  },
];
export default function Home() {
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView style={{ padding: 20, gap: 20 }}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", gap: 15 }}>
          <Image
            width={60}
            height={60}
            source={require("../../../assets/images/profile_photo.png")}
          />
          <View>
            <Text
              style={{
                color: appThemes.primaryTextColor,
                fontSize: appThemes.fontSize,
                fontWeight: 600,
              }}
            >
              Hello Osamudiame
            </Text>
            <Text
              style={{
                color: appThemes.secondaryTextColor,
                fontSize: 12,
              }}
            >
              Your Dream Job Awaits
            </Text>
          </View>
        </View>

        <NotificationIcon />
      </View>
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 30,
          gap: 20,
        }}
      >
        <ImageBackground style={styles.searchBarContainer}>
          <View style={{ position: "absolute", right: 40 }}>
            <TieIcon />
          </View>

          <Text style={styles.searchBarText}>
            <Text style={styles.textMuted}>get</Text> connected to{" "}
            <Text style={styles.textMuted}>your</Text> dream{" "}
            <Text style={styles.textMuted}>job</Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.filterTextInputContainer}>
              <SearchIcon />
              <TextInput style={{ borderRadius: 40, width: 200 }} />
            </View>
            <Pressable
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 999,
              }}
            >
              <FilterIcon />
            </Pressable>
          </View>
        </ImageBackground>
        <View style={{ padding: 10, gap: 20 }}>
          <SectionHeader title="Categories" />
          <LegendList
            data={jobCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            renderItem={({ item, index }) => (
              <View
                style={{
                  backgroundColor: index == 0 ? "#000000" : "#0000000D",
                  padding: 10,
                  borderRadius: 30,
                }}
              >
                <Text style={{ color: index == 0 ? "white" : "#666" }}>
                  {item}
                </Text>
              </View>
            )}
          />
          <SectionHeader title="Featured Jobs" />
          <LegendList
            data={featuredJobs}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
            renderItem={({ item, index }) => (
              <View
                style={{
                  backgroundColor: cardColor[index % (cardColor.length - 1)],
                  padding: 20,
                  width: width * 0.7,
                  borderRadius: 20,
                  gap: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <View
                      style={{
                        backgroundColor: "white",
                        padding: 18,
                        alignSelf: "flex-start",
                        borderRadius: 30,
                      }}
                    />
                    <View>
                      <Text style={{ color: "white" }}>{item.company}</Text>
                      <Text style={{ color: appThemes.mutedWhite }}>
                        {item.category}
                      </Text>
                    </View>
                  </View>

                  <Pressable
                    style={{
                      backgroundColor: appThemes.mutedWhite,
                      padding: 10,
                      borderRadius: 999,
                    }}
                  >
                    <BookMarkIcon />
                  </Pressable>
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    color: "white",
                    width: 200,
                    height: 50,
                  }}
                >
                  {item.title}
                </Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Text
                    style={[
                      styles.button,
                      { backgroundColor: "#000000", color: "white" },
                    ]}
                  >
                    Full Time
                  </Text>
                  <Text
                    style={[
                      styles.button,
                      {
                        color: "white",
                        borderWidth: 1.5,
                        borderColor: "white",
                      },
                    ]}
                  >
                    On site
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Pressable
                    style={{
                      backgroundColor: "white",
                      padding: 15,
                      paddingHorizontal: 20,
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      flexGrow: 1,
                    }}
                  >
                    <Text>{item.salaryRange}</Text>
                  </Pressable>
                  <Pressable
                    style={{
                      padding: 10,
                      backgroundColor: "#000",
                      borderRadius: 30,
                    }}
                  >
                    <ArrowRightIcon />
                  </Pressable>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarContainer: {
    backgroundColor: appThemes.activeColor,
    padding: 25,
    borderRadius: 30,
    position: "relative",
    gap: 20,
  },
  searchBarText: {
    color: "white",
    fontSize: 25,
    textTransform: "capitalize",
  },
  textMuted: {
    color: "#FFFFFF80",
  },
  filterTextInputContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    padding: 10,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
});
