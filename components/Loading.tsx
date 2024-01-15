import { CircularProgress } from "@nextui-org/react";

export default function LoadingScreen() {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <CircularProgress />
        </div>
    )
}