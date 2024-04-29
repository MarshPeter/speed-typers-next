import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser } from '@/app/db/db'

export async function POST(req: Request) {
//You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
        status: 400
    })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
    evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
    }) as WebhookEvent
    } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
        status: 400
    })
    }

    // Get the ID and type
    const { id } = evt.data;
    const eventType = evt.type;
    console.log('testing1')

    if (eventType === 'user.created') {
        console.log('testing2');
        const { id, username } = evt.data;

        if (typeof username !== 'string') {
            console.log("ACCOUNT NOT CREATED BECAUSE USERNAME WAS NOT CREATED");
            return new Response('ACCOUNT NOT CREATED BECAUSE USERNAME WAS NOT CREATED', {status: 400});
        }

        const brandNewUser = {
            username,
            clerkId: id
        }

        const newUserCreated = await createUser(brandNewUser);
        return new Response(`ACCOUNT ${id} CREATED - USERNAME ${newUserCreated}`, {status: 200});
    }
    console.log("testing3");

    console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
    console.log('Webhook body:', body)

    return new Response('', { status: 200 })
}