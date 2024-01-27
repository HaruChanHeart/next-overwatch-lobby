import { Card, CardFooter, Image, Chip } from "@nextui-org/react";
import CopyButton from "./CopyButton";
import ILobbyCard from "@/interfaces/LobbyCard";
import { useTranslation } from "next-i18next"

export default function LobbyCard(prop: ILobbyCard) {
    const { t } = useTranslation(['common', 'lobby']);

    const Available = () => {
        return <Chip size='sm' variant='dot' color='success' className='bg-black/50'>{t('common:available')}</Chip>
    }

    const Unavailable = () => {
        return <Chip size='sm' variant='dot' color='danger' className='bg-black/50'>{t('common:unavailable')}</Chip>
    }

    return (
        <Card isFooterBlurred className="w-full aspect-square md:aspect-video">
            <Image
                loading='lazy'
                removeWrapper
                alt={prop.name}
                className="z-0 w-full h-full object-cover"
                src={`/images/lobby/${prop.image}.avif`}
            />
            {prop.update ? <Chip variant='bordered' color='warning' radius='sm' className='absolute top-3 left-3 bg-black/75'>UPDATE</Chip> : null }
            <CardFooter className="absolute bg-black/60 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                    <div className="flex flex-col">
                        <p className="text-lg font-bold text-white/60">{t(`lobby:lobbyList.${prop.id - 1}.name`) ?? prop.name}</p>
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <span className="text-sm text-white/60">{t(`lobby:lobbyList.${prop.id - 1}.description`) ?? prop.description}</span>
                            {prop.available ? <Available /> : <Unavailable />}
                        </div>
                    </div>
                </div>
                <CopyButton code={prop.code} />
            </CardFooter>
        </Card>
    )
}