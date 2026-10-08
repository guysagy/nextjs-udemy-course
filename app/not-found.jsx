import Heading from '@/components/Heading';

export const metadata = {
    title: 'Not Found'
};

export default function NotFoundPage() {
    return (
        <>
            <Heading>Not Found</Heading>
            <p>Oops, the page you are looking for does not exist.</p>
        </>
    );
}