import { Link, Outlet } from "react-router-dom";
import MenuIcon from "../components/Icons/MenuIcon.jsx";
import Container from "../components/Layout/Container.jsx";
import Drawer from "../components/Layout/Drawer.jsx";
import Main from "../components/Layout/Main.jsx";
import TopBar from "../components/Layout/TopBar.jsx";
import LogoutButton from "../components/LogoutButton.jsx";
import ProfileMenu, {
  ProfileMenuItem,
} from "../components/Menu/ProfileMenu.jsx";
import useDrawer from "../hooks/useDrawer.js";
import img1 from "../assets/logo.svg";

export default function AppLayout() {
  const drawer = useDrawer();

  return (
    <Container>
      <TopBar>
        <button
          className="button icon-button open-drawer-button"
          onClick={drawer.open}
        >
          <MenuIcon />
        </button>

        <h5 className="m-0 flex gap-2 items-center md:justify-start justify-center">
          <img src={img1} alt="logo" className="w-[15%]" />
          <span className="text-primary ">Easy</span>
          Invoice
        </h5>
        <div>
          <ProfileMenu>
            <ProfileMenuItem>
              <Link
                className="button block-button is-small jc-start"
                to="/account"
              >
                Account
              </Link>
            </ProfileMenuItem>
            <ProfileMenuItem>
              <LogoutButton />
            </ProfileMenuItem>
          </ProfileMenu>
        </div>
      </TopBar>
      <Drawer />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}
