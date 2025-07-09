import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const hallengerSerif = localFont({
  src: "./fonts/HallengerSerifFont.ttf",
  variable: "--font-hallengerSerif",
});

export { montserrat, hallengerSerif };
