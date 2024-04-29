import { saveWPM } from "@/app/db/db"

export default async function UploadWPM(userId: string, WPM: string) {
    await saveWPM(WPM, userId);
}