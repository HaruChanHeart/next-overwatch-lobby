import { Card, CardFooter, Image, Chip } from "@nextui-org/react";
import CopyButton from "./CopyButton";
import ILobbyCard from "@/interfaces/LobbyCard";

export default function LobbyCard(prop: ILobbyCard) {
    const Available = () => {
        return <Chip size='sm' variant='dot' color='success'>Available</Chip>
    }

    const Unavailable = () => {
        return <Chip size='sm' variant='dot' color='danger'>Unavailable</Chip>
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
            <CardFooter className="absolute bg-black/60 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                    <div className="flex flex-col">
                        <p className="text-lg font-bold text-white/60">{prop.name}</p>
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <span className="text-sm text-white/60">{prop.description}</span>
                            {prop.available ? <Available /> : <Unavailable />}
                        </div>
                    </div>
                </div>
                <CopyButton code={prop.code} />
            </CardFooter>
        </Card>
    )
}