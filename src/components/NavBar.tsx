import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar: React.FC = () => {
    return (
        <div className="flex justify-between items-center w-full max-w-[768px] font-bold px-8">
            <Link href="/" className="">
                <Image
                    src={"/anon-blog-logo-name.png"}
                    alt="Logo"
                    width={150}
                    height={50}
                    className="rounded-full"
                />
            </Link>
            <Link href="/account" className="text-[#9b108a] text-5xl">
                <i className="bi bi-person-circle" />
            </Link>
        </div>
    );
};

export default NavBar;
