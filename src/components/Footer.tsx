import { GitHub, Linkedin } from 'react-feather';

export const Footer = () => {
  return (
    <footer className="flex flex-col w-full">
      <span className="h-[1px] border-b-[1px] border-lime-500 rounded" />
      <div className="flex flex-col gap-2 items-center p-2">
        <span className="text-xs text-gray-400">MoveMF - A workout diary app</span>
        <div className="flex gap-8">
          <a
            href="https://github.com/the-papabear/movemf"
            target="_blank"
            className="flex gap-1 items-center text-xs text-gray-400"
          >
            <GitHub height={12} width={12} />
            Check the repo
          </a>
          <a
            href="https://www.linkedin.com/in/gabriel-ursu/"
            target="_blank"
            className="flex gap-1 items-center text-xs text-gray-400"
          >
            <Linkedin height={12} width={12} />
            Check the dev
          </a>
        </div>
      </div>
    </footer>
  );
};
