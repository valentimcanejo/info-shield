import { useThemeStore } from "../store/use-theme-store";
import { Button, ButtonIcon } from "./ui/button";
import { MoonIcon, SunIcon } from "./ui/icon";

export default function ChangeThemeButton() {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <Button onPress={toggleTheme} variant="link">
      <ButtonIcon
        as={theme === "light" ? SunIcon : MoonIcon}
        className="w-12 h-12"
      />
    </Button>
  );
}
