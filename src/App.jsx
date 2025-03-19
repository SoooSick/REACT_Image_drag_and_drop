import { useState } from 'react'
import './App.css'
import { useDropzone } from 'react-dropzone';  // Package for Drag and drop  (npm i react-dropzone)
import { MdCancel } from 'react-icons/md'      // Package for Icons (npm i react-icons)

function App() {

  const [images, setImages] = useState([]);


  //  To store the selected image/file 
  const onDrop = (acceptedFiles => {
    console.log(acceptedFiles)                                             // To check the selected images data in the console
    let filePreview = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file)                                      // To create a URL for the images/files
    }
    ))

    setImages((previewImages) => ([...previewImages, ...filePreview]))        // By useing useState() to select multiple files

  })

  // to remore/filter out from multiple images/files  
  let cancelHandler = (index) => {
    setImages((previewImages) => previewImages.filter((_, ind) => {
      return index != ind;
    }))
  }


  // Step - 1 -> Use of hook from useDropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: "image/*"
  });

  return (
    <>
      <div className="grid grid-cols-1  ">
        <div className='text-center my-10'>
          <h1 className='text-4xl font-semibold'>Image Upload</h1>
        </div>


        {/* Drop box layout */}
        <div >

          <div {...getRootProps()} className='bg-amber-300 w-[50%] h-[18rem] mx-auto border-2 border-amber-500 border-dashed rounded-2xl'>
            <input {...getInputProps()}></input>
            <p className='text-center mt-25 outline-0'>Drop the files here ...</p>
            <p className='text-center'>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </div>

        <div className='grid grid-cols-6 mx-20 '>
          {images.map((img, index) => (
            <div className='m-3' key={index}>
              <img className=' h-[30vh] hover:h-full hover:w-full rounded-2xl' src={img.preview}></img>
              <button onClick={() => cancelHandler(index)}>

                <MdCancel />
              </button>

            </div>
          ))}
        </div>

      </div>

    </>
  )
}

export default App
