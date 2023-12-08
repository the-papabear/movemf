import { GitHub, Linkedin } from 'react-feather';

export default function Footer() {
  return (
    <footer className="absolute inset-x-0 bottom-0 flex w-full flex-col">
      <span className="h-[1px] rounded border-b-[1px] border-slate-200" />
      <div className="flex flex-col items-center gap-2 p-2">
        <span className="text-xs text-gray-400">MoveMF - Minimalist workout diary app</span>
        <div className="flex gap-8">
          <a
            href="https://github.com/the-papabear/movemf"
            target="_blank"
            className="flex items-center gap-1 text-xs text-gray-400"
          >
            <GitHub height={12} width={12} />
            Check the repo
          </a>
          <a
            href="https://www.linkedin.com/in/gabriel-ursu/"
            target="_blank"
            className="flex items-center gap-1 text-xs text-gray-400"
          >
            <Linkedin height={12} width={12} />
            Check the dev
          </a>
        </div>
      </div>
    </footer>
  );
}
