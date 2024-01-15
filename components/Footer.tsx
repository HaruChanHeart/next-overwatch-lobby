import { Link } from "@nextui-org/react"

export default function Footer() {
    return (
        <footer className='w-full flex flex-col gap-1 items-center justify-center py-20'>
            <span>&copy; {new Date().getFullYear()} HaruChanHeart</span>
            <p className='text-center lg:text-justify text-sm dark:text-zinc-600 mb-3'>This website is not affiliated with or endorsed by Blizzard Entertainment. Overwatch&reg; is a registered trademark of Blizzard Entertainment.</p>
            <Link href='https://github.com/HaruChanHeart/next-overwatch-lobby' color='foreground' size='lg'>
                <i className='fa-brands fa-github' />
            </Link>
        </footer>
    )
}