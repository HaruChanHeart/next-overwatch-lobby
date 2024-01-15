import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface ICopyButton {
    code: string
}

export default function CopyButton(prop: ICopyButton) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (copied) setCopied(false);
        }, 1000)

        return () => clearTimeout(timeout);
    }, [copied])

    const arg = '--lobbyMap=0x0800000000000000';
    const convertCode = arg.slice(0, arg.length - prop.code.length);

    return (
        <CopyToClipboard text={`${convertCode}${prop.code}`} onCopy={() => setCopied(true)}>
            <Button
                color={copied ? `success` : `primary`}
                radius='full'
                variant='shadow'
                size='sm'
            >
                {copied ? <span><i className="fa-solid fa-check"></i></span> : <span><i className="fa-solid fa-copy"></i></span> }
            </Button>
        </CopyToClipboard>
    )
}