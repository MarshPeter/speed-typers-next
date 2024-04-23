import Link from "next/link";

interface Props {
    linkTo: string;
    text: string;
    classes?: undefined | string;
}

function InPageLink({ linkTo, text, classes }: Props) {
    if (classes === undefined) {
        classes =
            "bg-yellow-200 p-2 text-4xl font-semibold border-4 border-blue-800 rounded-3xl hover:bg-yellow-900 hover:text-gray-100 hover:border-blue-500";
    }

    console.log(classes);

    return (
        <Link href={linkTo} className={classes}>
            {text}
        </Link>
    );
}

export default InPageLink;
