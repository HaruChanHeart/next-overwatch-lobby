import { Accordion, AccordionItem, Image } from "@nextui-org/react"
import GuideSection from "./Guide/GuideSection"

export default function Header() {
    return (
        <header className='w-full flex flex-col gap-1 items-center justify-center pt-20 pb-5'>
            <Image
                isBlurred
                radius='none'
                src='/logo.svg'
                width={'100%'}
                alt='OVERWATCH LOGO'
                className='my-2'
            />
            <p className='text-xl dark:text-zinc-400'>Unofficial Menu Screen Database</p>
            <Accordion>
                <AccordionItem key='1' aria-label='Customize Guide' title='Customize Guide' subtitle='Read first here if you wonder.'>
                    <div>
                        <GuideSection />
                    </div>
                </AccordionItem>
            </Accordion>
        </header>
    )
}