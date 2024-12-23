import style from "./index.module.scss";
import { Circle, Bookmark, Book } from 'lucide-react';
import { MailIcon } from "../header/components/mail";
import Invite from "@/../public/invite";


export const Menubar = () => {
    return (
        <div className={style.header}>
            <a href="/home" className="style.item">
                <Circle size={40}/>
            </a>
            <a href="/school">
                <Invite size={58}/>
            </a>
            <a href="/chat" className="style.item">
                <MailIcon count={3} size={40}/>
            </a>
            <a href="/address" className="style.item">
                <Bookmark size={40}/>
            </a>
            <a href="/confetti" className="style.item">
                <Circle size={40}/>
            </a>
            <a href="/qiita" className="style.item">
                <Book size={40}/>
            </a>
        </div>
    );
};