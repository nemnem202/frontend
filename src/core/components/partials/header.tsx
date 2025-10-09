import { Link } from "react-router";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import "../../../stylesheets/components/partials/header.css";

export default function Header() {
  return (
    <>
      <div className="header_main_container">
        <Link key="account" to={"/market"}>
          <div>
            <h1 className="site_name">A Completely Legal Website</h1>
            <p className="site_slogan">The Most Legal Website Ever</p>
          </div>
        </Link>
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Search</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <div className="header_button_container">
          <Link key="account" to={"/"}>
            <Button>My account</Button>
          </Link>
          <Link key="basket" to={"/"}>
            <Button>Basket</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
