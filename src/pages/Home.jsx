import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)

      try {
        const posts = await service.getPosts()
        if(posts) {
          setPosts(posts.documents)
        }
      } catch (error) {
        console.log("Error Fetching Posts: ", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts();
  }, [])

  if(posts.length === 0) {
    return (
      <div className='w-full py-8 mt-4 text-center'>
            <Container>
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-3xl font-bold mb-4'>Welcome to the SnapShots</h1>
                        <h1 className='text-2xl font-bold '>Login to Read Posts</h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {
            posts.map((post) => (
              <div key={post.$id} className='p-2 w-1/4'>
                <PostCard post={post}/>
              </div>
            ))
          }
        </div>
      </Container>
    </div>
  )
}