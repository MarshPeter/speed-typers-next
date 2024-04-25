import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center pt-8">
            <SignUp path="/sign-up" />;
        </div>
    );
}
