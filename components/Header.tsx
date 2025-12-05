import { Image } from "@heroui/image"
import { Accordion, AccordionItem } from "@heroui/accordion"
import GuideSection from "./Guide/GuideSection"
import { useTranslation } from "next-i18next"

export default function Header() {
    const { t } = useTranslation('common');

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
            <p className='text-xl dark:text-zinc-400'>{t('subtitle')}</p>
            <Accordion>
                <AccordionItem key='1' aria-label='Customize Guide' title={t('customize_title')} subtitle={t('customize_subtitle')}>
                    <div>
                        <GuideSection />
                    </div>
                </AccordionItem>
            </Accordion>
        </header>
    )
}