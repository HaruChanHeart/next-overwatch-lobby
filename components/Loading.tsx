import { CircularProgress } from "@heroui/progress"

export default function LoadingScreen() {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <CircularProgress aria-label='Loading...' />
        </div>
    )
}