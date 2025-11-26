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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HeaderProps {
  activeTab: "vendas" | "estoque";
  onTabChange: (tab: "vendas" | "estoque") => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="fixed left-0 w-screen flex items-center justify-between z-50">
      <div className="flex mx-[10rem] w-full items-center justify-between backdrop-blur-md max-w-full shadow-lg border border-border rounded-4xl px-8 py-2">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <img src={targetLogo} alt="Target Logo" className="w-30" />
          </div>
        </div>
        <Tabs
          value={activeTab}
          onValueChange={onTabChange as (value: string) => void}
        >
          <TabsList>
            <TabsTrigger value="vendas">Vendas</TabsTrigger>
            <TabsTrigger value="estoque">Estoque</TabsTrigger>
          </TabsList>
        </Tabs>

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
              <DropdownMenuItem asChild>
                <a
                  href="https://www.linkedin.com/in/wandayk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 !text-accent-foreground cursor-pointer"
                >
                  <img src={linkedin} alt="logo linkedin" className="w-5" />
                  Linkedin
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="https://github.com/wandayk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 !text-accent-foreground cursor-pointer"
                >
                  <img src={github} alt="logo github" className="w-5" />
                  Github
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <img src={email} alt="logo email" className="w-4 mt-0.5" />
              wandaykc@gmail.com
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
