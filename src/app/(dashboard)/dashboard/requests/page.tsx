import { fetchRedis } from '@/app/helpers/redis'
import FriendRequests from '@/components/FriendRequests'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { FC } from 'react'

const page = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    notFound()
  }

  // ids of people who sent current logged in user a frined requests
  const incomingSenderIds = (await fetchRedis(
    'smembers',
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[]

  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async senderId => {
      const senderRaw = (await fetchRedis('get', `user:${senderId}`)) as string
      const sender = JSON.parse(senderRaw) as User
      
      return {
        senderId,
        senderEmail: sender.email,
      }
    })
  )
  
  return (
    <main className="pt-8">
      <h1 className="font-bold text-5xl mb-8">Add a friend</h1>

      <div className="flfex flex-col gap-4">
        <FriendRequests
          incomingFriendRequests={incomingFriendRequests}
          sessionId={session.user.id}
        />
      </div>
    </main>
  )
}

export default page
