import { Trans, useTranslation } from "next-i18next"

export default function GuideSection() {
    const { t } = useTranslation('guide');

    return (
        <>
            <h1 className='text-xl font-semibold'>{t('section1_title')}</h1>
            <span className='text-sm dark:text-zinc-400'>
                <Trans t={t} i18nKey='section1_subtitle'>
                    Turn on Battle.net Launcher, click the gear icon then select <strong>Game Settings</strong>
                </Trans>
            </span>
            <h1 className='text-xl font-semibold mt-5'>{t('section2_title')}</h1>
            <span className='text-sm dark:text-zinc-400'>
                <Trans t={t} i18nKey='section2_subtitle'>
                    <strong>Enable additional command line arguments</strong> in Game Settings section. And paste the copied code. You are done!
                </Trans>
            </span>
        </>
    )
}