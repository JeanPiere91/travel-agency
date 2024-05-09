import React from "react";
import { useLanguageContext } from "./context/LanguageContext";

export default function LanguageHandler() {
  const { language, changeLanguage } = useLanguageContext();

  return (
    <select className="text-black text-2xl font-semibold tracking-wider" value={language} onChange={(e) => changeLanguage(e.target.value)}>
      <option value="en">En- English</option>
      <option value="es">Es- Spanish</option>
    </select>
  );
}
