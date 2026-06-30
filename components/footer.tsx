import { ReactNode } from "react";
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { InternalLink } from "./util";

function FooterTitle(props: { children: ReactNode }) {
    return (
        <div className='pb-2 text-2xl text-white'>
            {props.children}
        </div>
    )
}

function FooterColumn(props: { children: ReactNode, className?: string }) {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    )
}

function FooterLink(props: { title: string, dest: string }) {
    return (
        <div>
            <InternalLink href={props.dest}>{props.title}</InternalLink>
        </div>
    )
}

export default function Footer() {
    return (
        <footer className='pl-[10%] pr-[10%] bg-blue-800 text-sky-200'>
            <div className='pt-10 pb-10 flex gap-4 flex-wrap'>
            <FooterColumn>
                <FooterTitle>About Us</FooterTitle>
                <FooterLink title='About' dest='/about' />
                <FooterLink title='Our Lessons' dest='/lessons' />
                <FooterLink title='Meet the Team' dest='/our-team' />
                <FooterLink title="FAQ" dest='/faq' />
            </FooterColumn>
            <FooterColumn>
                <FooterTitle>Get Involved</FooterTitle>
                <FooterLink title='Apply to be a Volunteer' dest='/volunteer' />
                <FooterLink title='Become one of our Teachers' dest='https://forms.gle/TEAbKVA1wUV7cHVF7' />
                <FooterLink title='Contact' dest='/contact' />
            </FooterColumn>
            <FooterColumn>
                <FooterTitle>Register</FooterTitle>
                <FooterLink title='Register for Lessons' dest='/register' />
            </FooterColumn>
            <FooterColumn className='flex gap-4 text-blue-800'>
                <div><InternalLink href="/contact" className='text-lg py-3 px-3 rounded-lg bg-[#3399ff] text-white'>Contact Us</InternalLink></div>
                <div><InternalLink href="/donate" className='text-lg py-3 px-4 rounded-lg bg-gray-100'>Donate</InternalLink></div>
            </FooterColumn>
            </div>
            <div className='flex flex-wrap gap-3 pb-3'>
                <a href='http://www.facebook.com/MusicUnbounded.nonprofit/'>
                    <FaFacebook color="white" size={35} />
                    </a>
                <a href='http://www.instagram.com/music.unbounded/'>
                <FaInstagram color="white" size={35} />
                </a>
            </div>
            <div className='pb-10'>
                Registration Number: 799098306RR0001
                <br />
                Website Version: 230707
            </div>
        </footer>
    )
}