import Link from 'next/link';
import Heading from '@/components/Heading';
import strings from '../strings';

export default function HomePage() {
    return (
        <div>
            <Heading>{strings.appName}</Heading>
            <p className="pb-3">
                {strings.appTitle}
            </p>
            <div className="bg-white border rounded shadow w-80 hover:shadow-xl sm:w-full">
                <Link href="/reviews/stardew-valley"
                    className="flex flex-col sm:flex-row"
                >
                    <img src="/images/stardew-valley.jpg" alt="Stardew Valley"
                        width="320px" height="180px" className="rounded-t sm:rounded-l sm:rounded-r-none"
                    />
                    <h2 className="font-orbitron font-semibold py-1 text-center sm:px-2">
                        Stardew Valley
                    </h2>
                </Link>
            </div>
        </div>
    )
}