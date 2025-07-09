import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar: React.FC = () => {
    return (
        <div className="flex justify-evenly w-full max-w-[768px] text-gray-950 font-bold">
            <Link href="/" className="">
                <Image
                    src={"/anon-blog-logo-name.png"}
                    alt="Logo"
                    width={150}
                    height={50}
                    className="rounded-full"
                />
            </Link>
        </div>
    );
};

export default NavBar;
