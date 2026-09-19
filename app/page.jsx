import Heading from '@/components/Heading';
import strings from '../strings';

export default function HomePage() {
    return (
        <div>
            <Heading>{strings.appName}</Heading>
            <p>{strings.appTitle}</p>
        </div>
    )
}