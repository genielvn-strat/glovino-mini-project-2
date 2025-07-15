import Image from "next/image";

export default function NotFound() {
    return (
        <div className="flex pt-8 items-center justify-center flex-col">
            <Image src="/404.png" alt="404-img" width={300} height={300} />
            <h1 className="text-2xl">Not found!</h1>
        </div>
    );
}
