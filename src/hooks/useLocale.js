import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import md5 from "md5";
import useAdmin from "./useAdmin";

const writing_modes = {
  ar: "rtl",
  en: "ltr",
  default: "ltr",
};

export default function useLocale(key, hash = false) {
  const { locale } = useRouter();
  const admin = useAdmin();
  const writing_mode = writing_modes[locale];
  const rtl = writing_mode === "rtl";
  const ltr = writing_mode === "ltr";

  var T = useTranslations(key);

  var t, thas;

  if (locale === "en" || locale === "default") {
    t = (k) => k;
  } else {
    t = (k) => {
      const h = hash ? md5(k) : k;
      const exists = T.has(h);
      return exists ? T(h) : admin ? `{ ${k} }` : k;
    };
  }

  if (locale === "en") {
    thas = (k) => k;
  } else {
    thas = (k) => {
      const h = hash ? md5(k) : k;
      const exists = T.has(h);
      return exists;
    };
  }

  return { locale, writing_mode, rtl, ltr, t, thas };
}
