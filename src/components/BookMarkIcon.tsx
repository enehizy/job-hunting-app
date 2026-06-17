import Svg, { Mask, Path, G } from "react-native-svg";
export default function BookMarkIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Mask
        id="a"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x={2}
        y={0}
        width={16}
        height={19}
      >
        <Path
          d="M4.064 17.881a.813.813 0 0 1-.813-.813V2.438a.813.813 0 0 1 .813-.812h11.379a.813.813 0 0 1 .813.812v14.63a.813.813 0 0 1-.813.813z"
          fill="#fff"
          stroke="#fff"
          strokeWidth={1.626}
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.534 8.94V1.627h4.877V8.94l-2.439-2.55z"
          fill="#000"
          stroke="#000"
          strokeWidth={1.626}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M4.064 1.626h11.379"
          stroke="#fff"
          strokeWidth={1.626}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Mask>
      <G mask="url(#a)">
        <Path d="M0 0h19.507v19.507H0z" fill="#fff" />
      </G>
    </Svg>
  );
}
