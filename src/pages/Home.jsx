import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'

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
                    <div className='p-2 w-full mb-8'>                            
                        <h1 className='text-4xl font-bold mb-4'>Welcome to the SnapShots</h1>
                        <h1 className='text-3xl font-bold'>Login to Read Posts</h1>
                    </div>    
                    <div className='p-2 w-full grid grid-cols-3 gap-8'>
                      <div><img className='rounded-xl shadow-xl' src="https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg"/></div>
                      <div><img className='rounded-xl shadow-xl' src="https://images.pexels.com/photos/548084/pexels-photo-548084.jpeg"/></div>
                      <div><img className='rounded-xl shadow-xl' src="https://images.pexels.com/photos/459451/pexels-photo-459451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" /></div>
                      <div><img className='rounded-xl shadow-xl' src='https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/></div>
                      <div><img className='rounded-xl shadow-xl' src="https://images.pexels.com/photos/6796883/pexels-photo-6796883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" /></div>
                      <div><img className='rounded-xl shadow-xl' src="https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" /></div>
                      <div><img className='rounded-xl shadow-xl' src="https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" /></div>
                      <div><img className='rounded-xl shadow-xl' src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" /></div>
                      <div><img className='rounded-xl shadow-xl' src="https://images.pexels.com/photos/29984285/pexels-photo-29984285/free-photo-of-monochrome-portrait-of-a-barnacle-goose-by-water.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" /></div>
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