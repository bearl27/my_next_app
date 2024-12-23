import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface NavlinkProps {
  href: string;
  Icon: LucideIcon;
  text: string;
}

const Navlink: React.FC<NavlinkProps> = ({ href, Icon, text }) => {
  return (
    <Link href={href} className="flex flex-col items-center space-y-1">
      <Icon size={24} />
      <p className="text-sm">{text}</p>
    </Link>
  );
};

export default Navlink;