import { IoSearch } from "react-icons/io5";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group";
import "../../../stylesheets/components/partials/header.css";
import { ButtonGroup } from "../ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useIsMobile } from "../../../hooks/use-mobile"; // <-- Ajout de l'import
import DisconnectButton from "./disconnect_button";
import { use_session } from "@/services/session_provider";

export default function Header() {
  const isMobile = useIsMobile(); // <-- Utilisation du hook

  const { session } = use_session();

  return (
    <>
      <div className="header_main_container">
        <Link key="account" to={"/market"}>
          <div>
            <h1 className="site_name">A Completely Legal Website</h1>
            <p className="site_slogan">The Most Legal Website Ever</p>
          </div>
        </Link>
        <InputGroup className="searchbar">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton>
              <IoSearch />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {isMobile ? (
          <ButtonGroup>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link key="account" to={"/"}>
                    My account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link key="basket" to={"/market/basket"}>
                    Basket
                  </Link>
                </DropdownMenuItem>

                {session === "vendor" && (
                  <DropdownMenuItem>
                    <Link key="vendor" to={"/upload"}>
                      Upload
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <DisconnectButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        ) : (
          <div className="header_button_container">
            <Link key="account" to={"/"}>
              <Button variant="outline">My account</Button>
            </Link>

            <Link key="basket" to={"/market/basket"}>
              <Button variant="outline">Basket</Button>
            </Link>
            {session === "vendor" && (
              <Link key="vendor" to={"/upload"}>
                <Button variant="outline">Upload</Button>
              </Link>
            )}
            <DisconnectButton />
          </div>
        )}
      </div>
    </>
  );
}
