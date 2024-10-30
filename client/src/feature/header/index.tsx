import { MessageCircle, StickyNote, School, Circle } from "lucide-react";
import style from "./index.module.scss";
import Navilink from "./logo";


export const Header = () => {
    return (
        <div className={style.header}>
            <Navilink href="/chat" Icon={MessageCircle} text="Chat" />
            <Navilink href="/address" Icon={StickyNote} text="Address" />
            <Navilink href="/school" Icon={School} text="School" />
            <Navilink href="/confetti" Icon={Circle} text="Confetti" />
        </div>
    );
};