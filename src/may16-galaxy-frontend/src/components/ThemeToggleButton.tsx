import moonIcon from "@iconify/icons-lucide/moon";
import sunIcon from "@iconify/icons-lucide/sun";

import { Button, ButtonProps } from "@/components/daisyui";

import Icon from "@/components/Icon";

const ThemeToggleButton = (props: ButtonProps & { theme: string }) => {
  return (
    <>
      <Button {...props} hx-get="/toggleTheme" hx-swap="none" _="
                    on click
                        get @data-theme of <html/> then set currentTheme to it[0]

                        if currentTheme is 'dark' then
                          set @data-theme of <html/> to 'light'
                        else
                          set @data-theme of <html/> to 'dark'
                        end

                        toggle .hidden on <span/> in me
                ">
        <Icon hidden={props.theme == 'light'} icon={sunIcon} fontSize={20} /> 
        <Icon hidden={props.theme == 'dark'} icon={moonIcon} fontSize={20} />
      </Button>
    </>
  );
};

export default ThemeToggleButton;
