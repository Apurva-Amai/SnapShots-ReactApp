import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({ name, control, label, defaultValue = ""}) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller 
      name={name || 'description'}
      control={control}
      render={({field: { onChange }}) => (
        <Editor 
        apiKey='8ura1c8nfnpuprz68gm2w44u7j3e9dc2u63syfqveblco44m'
        initialValue={defaultValue}
        init={{
          initialValue: defaultValue,
          height: 500,
          menubar: true,
          plugins: [
            "image",
            "link",
            "lists",
            "table",
            "code",
            "media",
            "emoticons",
            "spellchecker",
            "searchreplace",
            "fullscreen",
            "autolink",
            "paste",
            "wordcount",
            "preview",
            "template",
            "codepen",
            "imageupload",
            "mediaembed",
            "directionality",
            "tinydrive",
            "colorpicker",
            "advlist",
            "charmap",
            "visualblocks",
            "insertdatetime",
            "help",
            "anchor",
          ],
          toolbar: 
                "undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | template code | preview fullscreen | emoticons charmap | searchreplace | help | blocks | image",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorStateChange={onChange}
        />
      )}
      />
    </div>
  )
}
