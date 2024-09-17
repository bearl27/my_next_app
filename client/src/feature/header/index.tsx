import { House, MessageCircle, StickyNote } from "lucide-react";
import style from "./index.module.scss";
import Link from "next/link";

export const Header = () => {
    return (
        <div className={style.header}>
            <Link href="/chat">
                <MessageCircle />
                <p>Chat</p>
            </Link>

            <Link href="/address">
                <House />
                <p>Address</p>
            </Link>

            <Link href="/memo">
                <StickyNote />
                <p>Memo</p>
            </Link>
        </div>
    );
};