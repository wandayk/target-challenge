import targetLogo from "../assets/target.svg";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import image from "@/assets/image.jpg";
import linkedin from "@/assets/linkedin.svg";
import github from "@/assets/github.svg";
import email from "@/assets/email.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  return (
    <header className="fixed left-0 w-full flex items-center justify-between">
      <div className="flex mx-[10rem] w-full items-center justify-between  backdrop-blur-md nax-w-full shadow-lg border border-border rounded-4xl px-8 py-2">
        <div className="flex">
          <div className="flex flex-col">
            <img src={targetLogo} alt="Target Logo" className="w-30" />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 hover:bg-muted cursor-pointer px-6 py-3 rounded-4xl -mr-6">
              <div className="flex flex-col items-end gap-1">
                <small className="leading-none text-sm text-muted-foreground">
                  Desenvolvido por
                </small>
                <span className="leading-none text-md font-semibold">
                  Wandayk Cavalcante
                </span>
              </div>
              <Avatar>
                <AvatarImage src={image} />
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="" align="start">
            <DropdownMenuLabel>Contato</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <img src={linkedin} alt="logo linkedin" className="w-5" />
                Linkedin
              </DropdownMenuItem>
              <DropdownMenuItem>
                <img src={github} alt="logo linkedin" className="w-5" />
                Github
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <img src={email} alt="logo linkedin" className="w-4 mt-0.5" />
              wandaykc@gmail.com
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
