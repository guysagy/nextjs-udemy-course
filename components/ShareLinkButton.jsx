export default function ShareLinkButton() {
    const handleClick = () => {
        console.log('clicked');
    };

    return (
        <button onclick={handleClick}
            className="border px-2 py-1 rounded text-slate-500 text-sm
                        hover:bg-orange-100 hover:text-slate-700 hover:cursor-pointer"
        >
            Share Link
        </button>
    );
}