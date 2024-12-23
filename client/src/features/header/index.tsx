import { MessageCircle, StickyNote, School, Circle, Book, TreePine } from "lucide-react";
import style from "./index.module.scss";
import Navilink from "./components/link";
import { PenIcon } from "@/../public/pencil";
import { MailIcon } from "./components/mail";


export const Header = () => {
    return (
        <div className={style.header}>
            <Navilink href="/chat" Icon={MessageCircle} text="Chat" />
            <Navilink href="/address" Icon={StickyNote} text="Address" />
            <Navilink href="/school" Icon={School} text="School" />
            <Navilink href="/confetti" Icon={Circle} text="Confetti" />
            <Navilink href="/imageup" Icon={Circle} text="ImageUp" />
            <Navilink href="/qiita" Icon={Book} text="Qiita" />
            <Navilink href="/home" Icon={TreePine} text="home" />
            <PenIcon size={50} color="black" />
            <Navilink href="/point-button" Icon={Circle} text="PointButton" />
        </div>
    );
};