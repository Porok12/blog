import {PropsWithChildren} from "react";

interface Props extends PropsWithChildren {

}

const Footer = (props: Props) => {
  return (
      <footer className="bg-gray-200 dark:bg-slate-800">
          <div className="container mx-auto py-8 h-64">
              footer
          </div>
      </footer>
  )
}

export default Footer;
