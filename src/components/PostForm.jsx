import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from './index'
import service from '../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
  console.log("Post: ", post)
  const { register, handleSubmit, watch, setValue, control, getValues} = useForm({
    defaultValues: {
      title: post?.title || '',
      articleID: post?.$id || articleID,
      description: post?.description || '',
      status: post?.status || 'Active',
    }
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    console.log("Data: ", data)
    if(post) {
      const file = data.image[0] ? await service.uploadFile(data.image[0]) : null
      console.log("File: ", file)

      if(file) {
        service.deleteFile(post.imageID)
      }

      const dbPost = await service.updatePost(articleID, {
        ...data,
        imageID: file ? file.$id : post.imageID,        // imageID: file ? file.$id : undefined
      })
      console.log("dbPost: ", dbPost)

      if(dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else {
      const file = data.image[0] ? await service.uploadFile(data.image[0]) : null
      console.log("File: ", file)

      if(file) {
        const fileID = file.$id
        data.imageID = fileID

        const dbPost = await service.createPost({
          ...data,
          userID: userData.$id
        })
        console.log("dbPost: ", dbPost)

        if(dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }


  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className='w-2/3 px-2'>
        <Input 
        label = "Title :"
        placeholder = "Title"
        className = "mb-4"
        {...register("title", { required: true })} 
        />
        <RTE label="Description :" name="description" control={control} defaultValue={getValues("description")}/>
      </div>
      <div className='w-1/3 px-2'>
        <Input 
        label = "Featured Image :"
        type = "file"
        className = "mb-4"
        accept = "image/png, image/jpg, image/jpeg, image/gif"
        {...register("image", {required : !post})}
        />
        {post && (
          <div>
            <img src={service.getFilePreview(post.imageID)} 
            alt={post.title} 
            className='rounded-lg'
            />
          </div>
        )}
        <Select 
          options={["Active", "Inactive"]}
          label="Status :"
          className="mb-4"
          {...register("status", {required : true})}
        />
        <Button type='submit' bgColor={post ? "bg-green-500" : undefined} className='w-full'>
          {post ? "Update" : "Submit"}
        </Button>
      </div>

    </form>
  )
}

export default PostForm