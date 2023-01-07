import {
  HeaderContainer,
  LogoAndThemeContainer,
  ThemeSwitcher,
} from "./styles";
import { Timer, Scroll, Sun } from "phosphor-react";
import Logo from "../../assets/Logo.svg";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
export function Header() {
  const { switchTheme } = useContext(CyclesContext);

  function handleSwitchTheme() {
    switchTheme();
  }
  return (
    <HeaderContainer>
      <LogoAndThemeContainer>
        <img src={Logo} alt="" />
        <ThemeSwitcher type="button" onClick={handleSwitchTheme}>
          <Sun size={24} />
        </ThemeSwitcher>
      </LogoAndThemeContainer>
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
