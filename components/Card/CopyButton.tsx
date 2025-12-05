import { Button } from '@heroui/button'
import { useEffect, useState } from 'react';
import { useCopyToClipboard } from '@uidotdev/usehooks'

interface ICopyButton {
    code: string
}

export default function CopyButton(prop: ICopyButton) {
    const [copied, setCopied] = useState(false);
    const [copiedText, copy] = useCopyToClipboard();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (copied) setCopied(false);
        }, 1000)

        return () => clearTimeout(timeout);
    }, [copied])

    const arg = '--lobbyMap=0x0800000000000000';
    const convertCode = arg.slice(0, arg.length - prop.code.length);

    return (
        <Button
            color={copied ? `success` : `primary`}
            radius='full'
            variant='shadow'
            size='sm'
            onClick={() => {
                copy(`${convertCode}${prop.code}`);
                setCopied(true);
            }}
        >
            {copied ? <span><i className="fa-solid fa-check"></i></span> : <span><i className="fa-solid fa-copy"></i></span> }
        </Button>
    )
}