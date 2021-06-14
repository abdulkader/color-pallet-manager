import Link from 'next/link';

const Logo = () => {
  return (
    <div className="block w-auto text-center py-2">
      <Link href="/">
        <a className="text-lg font-semibold text-center block text-transparent bg-clip-text bgGradiants cursor-pointer">
          Color Pallet Manager
        </a>
      </Link>
    </div>
  );
};

export default Logo;
